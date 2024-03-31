import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        userId: user.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
