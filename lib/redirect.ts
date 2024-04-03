"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function redirectToChat(serverId?: string) {
  if (serverId) {
    redirect(`/servers/${serverId}`);
  }

  // TODO: go to previous visted server instead of the first found
  const user = await getCurrentUser();
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });
  redirect(`/servers/${server?.id || ""}`);
}
