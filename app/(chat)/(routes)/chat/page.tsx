import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modal/initial-modal";
import { initialUser } from "@/lib/initial-user";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, redirectToLogin } from "@/lib/session";

export default async function SetupPage() {
  const user = await getCurrentUser();
  if (!user) return redirectToLogin();

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
