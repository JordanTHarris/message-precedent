import { redirect } from "next/navigation";
import { ChannelsSidebar } from "@/components/server/channels-sidebar";
import { MobileToggle } from "@/components/shared/mobile-toggle";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirectToLogin } from "@/lib/session";
import { NavSidebar } from "@/components/nav/nav-sidebar";

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
      <MobileToggle serverId={params.serverId}>
        {/* <div className="w-70 flex h-full"> */}
        {/* <div className="flex h-full w-[72px] ">
            <NavSidebar />
          </div> */}
        <div className="w-70 flex h-full">
          <ChannelsSidebar serverId={params.serverId} />
        </div>
        {/* </div> */}
      </MobileToggle>
      {/* <div className="fixed inset-y-0 z-20 flex h-12 w-60 flex-col justify-center md:hidden ">
        <MobileToggle serverId={params.serverId} />
      </div> */}
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
