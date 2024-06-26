import { NavAction } from "@/components/nav/nav-action";
import { NavItem } from "@/components/nav/nav-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirectToLogin } from "@/lib/session";
import { NavUser } from "./nav-user";

export async function NavSidebar() {
  const user = await currentUser();

  if (!user) {
    redirectToLogin();
    return null;
  }

  // TODO: sort servers by member added date or custom order
  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  return (
    <div className="flex h-full flex-col items-center space-y-4 bg-secondary py-3">
      <NavAction />
      <div className="w-full px-4">
        <Separator className="h-1 rounded-md" />
      </div>
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
          </div>
        ))}
      </ScrollArea>
      <NavUser user={user} />
    </div>
  );
}
