"use client";

import { Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/lib/hooks/use-sheet-store";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export function ChatHeader({ serverId, name, type, imageUrl }: ChatHeaderProps) {
  const { onOpenSidebar } = useSidebar();

  return (
    <div className="flex h-12 items-center border-b-2 border-secondary px-3 text-base font-semibold">
      <Button
        className="ml-8 items-center justify-center border-b-2 border-none p-0 text-base font-semibold text-foreground md:ml-0"
        variant="link"
        onClick={() => onOpenSidebar(true)}
      >
        {type === "channel" && (
          <Hash className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        )}
        <p className="truncate font-semibold">{name}</p>
      </Button>
    </div>
  );
}
