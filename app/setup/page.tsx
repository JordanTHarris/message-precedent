import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { initialUser } from "@/lib/initial-user";

export default async function SetupPage() {
  const user = await initialUser();
  console.log({ user });

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return (
    <div>
      <h1>Setup</h1>
    </div>
  );
}
