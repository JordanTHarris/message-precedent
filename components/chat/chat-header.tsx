import { Hash } from "lucide-react";
import { MobileToggle } from "../shared/mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export function ChatHeader({ serverId, name, type, imageUrl }: ChatHeaderProps) {
  return (
    <div className="flex h-12 items-center border-b-2 border-secondary px-3 text-base font-semibold">
      {/* <MobileToggle serverId={serverId} /> */}
      {type === "channel" && (
        <Hash className="ml-8 h-5 w-5 flex-shrink-0 text-muted-foreground md:ml-0" />
      )}
      <p className="truncate font-semibold">{name}</p>
    </div>
  );
}
