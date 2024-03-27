import { redirect } from "next/navigation";
import { InitialModal } from "@/components/layout/initial-modal";
import { initialUser } from "@/lib/initial-user";
import { prisma } from "@/lib/prisma";

export default async function SetupPage() {
  const user = await initialUser();

  // const server = await prisma.server.findFirst({
  //   where: {
  //     members: {
  //       some: {
  //         userId: user?.id,
  //       },
  //     },
  //   },
  // });

  // if (server) {
  //   redirect(`/servers/${server.id}`);
  // }

  return <InitialModal />;
}
