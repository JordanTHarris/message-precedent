"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useMediaQuery from "@/lib/hooks/use-media-query";

export function MobileToggle({
  serverId,
  children,
}: {
  serverId: string;
  children: React.ReactNode;
}) {
  const { device } = useMediaQuery();

  return (
    <>
      {device === "mobile" ? (
        <Sheet modal={false}>
          <SheetTrigger asChild>
            <div className="fixed flex h-12 items-center">
              <Button variant="ghost" size="icon" className="h-12 ">
                <Menu />
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-fit gap-0 p-0" hideCloseButton>
            {children}
          </SheetContent>
        </Sheet>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
