"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { ActionTooltip } from "@/components/shared/action-tooltip";
import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/hooks/use-modal-store";
import { ServerWithMembersWithUsers } from "@/types/types";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithUsers;
}

export function ChannelsSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2 text-muted-foreground">
      <p className="m-1 text-xs font-semibold uppercase">{label}</p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onOpen("createChannel", { channelType })}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onOpen("members", { server })}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </ActionTooltip>
      )}
    </div>
  );
}
