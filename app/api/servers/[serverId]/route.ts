import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const user = await currentUser();
    const { name, imageUrl } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        userId: user.id,
      },
      data: {
        name: name,
        imageUrl: imageUrl,
      },
    });

    console.log("SERVER_ID_PATCH", server);

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER_ID_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
