import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

// Update server name and image
export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const { name, imageUrl } = await req.json();

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

// Delete server permanently
export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const server = await prisma.server.delete({
      where: {
        id: params.serverId,
        userId: user.id,
      },
    });

    console.log("SERVER_ID_DELETE", server);

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER_ID_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
