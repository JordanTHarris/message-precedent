import { redirect } from "next/navigation";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirectToLogin } from "@/lib/session";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

export default async function InviteCodePage({ params }: InviteCodePageProps) {
  const user = await currentUser();

  if (!user) return redirectToLogin();

  if (!params.inviteCode) return redirect("/");

  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const server = await prisma.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            userId: user.id,
          },
        ],
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return null;
}
