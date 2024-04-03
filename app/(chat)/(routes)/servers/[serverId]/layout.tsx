import { redirect } from "next/navigation";
import { ChannelsSidebar } from "@/components/server/channels-sidebar";
import { MobileToggle } from "@/components/shared/mobile-toggle";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirectToLogin } from "@/lib/session";

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const user = await currentUser();

  if (!user) return redirectToLogin();

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div className="flex h-full">
      <MobileToggle>
        <div className="flex h-full">
          <ChannelsSidebar serverId={params.serverId} />
        </div>
      </MobileToggle>
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
