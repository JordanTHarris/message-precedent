"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit2, Hash, Lock, Mic, Trash2, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ActionTooltip } from "../shared/action-tooltip";

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
  const params = useParams();
  const router = useRouter();

  const icon = iconMap[channel.type];

  return (
    <Button
      onClick={() => {}}
      variant="ghost"
      className="group flex w-full items-center justify-start gap-x-2 px-2 py-2 text-muted-foreground"
    >
      {icon}
      <p
        className={cn(
          "line-clamp-1 text-sm font-semibold",
          params?.channelId === channel.id && "text-primary-foreground",
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit" side="top">
            <Edit2 className="h-4 w-4 scale-0 transition-transform group-hover:scale-100" />
          </ActionTooltip>
          <ActionTooltip label="Delete" side="top">
            <Trash2 className="h-4 w-4 scale-0 transition-transform group-hover:scale-100" />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && <Lock className="ml-auto h-4 w-4" />}
    </Button>
  );
}
