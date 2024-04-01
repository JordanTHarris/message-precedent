import { Menu } from "lucide-react";
import { NavSidebar } from "@/components/nav/nav-sidebar";
import { ChannelsSidebar } from "@/components/server/channels-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileToggle({ serverId }: { serverId: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0" hideCloseButton>
        <div className="w-[72px]">
          <NavSidebar />
        </div>
        <ChannelsSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
