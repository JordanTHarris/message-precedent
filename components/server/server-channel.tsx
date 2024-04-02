"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit2, Hash, Lock, Mic, Trash2, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "@/components/shared/action-tooltip";
import { Button } from "@/components/ui/button";
import { ModalType, useModal } from "@/lib/hooks/use-modal-store";
import { cn } from "@/lib/utils";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 flex-shrink-0" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 flex-shrink-0" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 flex-shrink-0" />,
};

export function ServerChannel({ channel, server, role }: ServerChannelProps) {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const icon = iconMap[channel.type];

  function onClick() {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  }

  // stop propagation to prevent clicking through to outer button
  function onAction(e: React.MouseEvent, action: ModalType) {
    e.stopPropagation();
    onOpen(action, { server, channel });
  }

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "group flex w-60 items-center justify-start gap-x-2 px-2 py-2 text-muted-foreground hover:bg-accent/60 hover:text-muted-foreground",
        params?.channelId === channel.id && "bg-accent hover:bg-accent",
      )}
    >
      {icon}
      <p
        className={cn(
          "truncate text-sm font-semibold group-hover:text-accent-foreground",
          params?.channelId === channel.id &&
            "text-foreground group-hover:text-foreground",
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit" side="top">
            <Edit2
              className="h-4 w-4 scale-0 transition-transform hover:text-accent-foreground group-hover:scale-100"
              onClick={(e) => onAction(e, "editChannel")}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete" side="top">
            <Trash2
              className="h-4 w-4 scale-0 transition-transform hover:text-accent-foreground group-hover:scale-100"
              onClick={(e) => onAction(e, "deleteChannel")}
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && <Lock className="ml-auto h-4 w-4" />}
    </Button>
  );
}
