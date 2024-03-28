"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/shared/action-tooltip";
import { Button } from "@/components/ui/button";

export function NavAction() {
  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <Button
        size="icon"
        variant="default"
        className="h-[48px] w-[48px] rounded-full"
      >
        <Plus size={24} />
      </Button>
    </ActionTooltip>
  );
}
