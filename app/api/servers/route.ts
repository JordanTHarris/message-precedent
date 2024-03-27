import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prisma.server.create({
      data: {
        userId: user.id,
        name: name,
        imageUrl: imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", userId: user.id }],
        },
        members: {
          create: [{ userId: user.id, role: MemberRole.ADMIN }],
        },
      },
    });
    console.log("SERVERS_POST", server);

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVERS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
