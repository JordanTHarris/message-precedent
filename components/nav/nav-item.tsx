"use client";

import { Ghost } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "@/components/shared/action-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export function NavItem({ id, imageUrl, name }: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <div className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 w-[2px] rounded-r-full bg-primary transition-all",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]",
          )}
        />
        <Button
          className={cn(
            "group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-full transition-all group-hover:rounded-[16px]",
            params?.serverId === id && "rounded-[16px]",
          )}
          onClick={onClick}
          variant="ghost"
        >
          <Image fill src={imageUrl} alt="Channel" sizes="48px" />
        </Button>
      </div>
    </ActionTooltip>
  );
}
