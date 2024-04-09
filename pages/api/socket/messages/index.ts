import { NextApiRequest } from "next";
import { currentUserPages } from "@/lib/current-user-pages";
import prisma from "@/lib/prisma";
import { NextApiResponseServerIo } from "@/types/types";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = await currentUserPages(req, res);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;

    if (!serverId) {
      return res.status(400).json({ message: "Server ID Missing" });
    }

    if (!channelId) {
      return res.status(400).json({ message: "Channel ID Missing" });
    }

    if (!content) {
      return res.status(400).json({ message: "Content Missing" });
    }

    const server = await prisma.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ message: "Server Not Found" });
    }

    const channel = await prisma.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel Not Found" });
    }

    const member = server.members.find((member) => member.userId === user.id);

    if (!member) {
      return res.status(404).json({ message: "Member Not Found" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal error" });
  }
}
