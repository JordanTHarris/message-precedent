"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/shared/action-tooltip";
import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/hooks/use-modal-store";

export function NavAction() {
  const { onOpen } = useModal();

  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <Button
        size="icon"
        variant="default"
        className="h-[48px] w-[48px] rounded-full"
        onClick={() => onOpen("createServer")}
      >
        <Plus size={24} />
      </Button>
    </ActionTooltip>
  );
}
