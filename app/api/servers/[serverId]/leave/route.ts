import { NextResponse } from "next/server";
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
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        userId: {
          not: user.id, // admin can't leave own server
        },
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            userId: user.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER_ID_LEAVE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
