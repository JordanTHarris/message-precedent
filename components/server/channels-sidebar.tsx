import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ChannelsHeader } from "@/components/server/channels-header";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

interface ServerSidebarProps {
  serverId: string;
}

export async function ChannelsSidebar({ serverId }: ServerSidebarProps) {
  const user = await currentUser();

  if (!user) return redirect("/");

  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );

  const members = server?.members.filter((member) => member.userId !== user.id);
  const role = server.members.find((member) => member.userId === user.id)?.role;

  return (
    <div className="flex h-full w-full flex-col bg-muted">
      <div>
        <ChannelsHeader server={server} role={role} />
      </div>
    </div>
  );
}
