"use client";

import { Member, MemberRole, Server, User } from "@prisma/client";
import { Crown, ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import UserAvatar from "../shared/user-avatar";

interface ServerMemberProps {
  member: Member & { user: User };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 text-emerald-500" />,
  [MemberRole.ADMIN]: <Crown className="h-4 w-4 text-amber-500" />,
  // [MemberRole.ADMIN]: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
};

export function ServerMember({ member, server }: ServerMemberProps) {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "mb-1 flex w-full items-center justify-start gap-x-2 p-2 text-muted-foreground",
          params?.userId === member.user.id && "text-primary-foreground",
        )}
      >
        <UserAvatar
          src={member.user.image || ""}
          alt={member.user.name || ""}
          fallback={member.user.name || ""}
          className="h-8 w-8"
        />
        <p
          className={cn(
            "text-sm font-semibold",
            params?.userId === member.user.id && "text-primary-foreground",
          )}
        >
          {member.user.name}
        </p>
        {icon}
      </Button>
    </div>
  );
}
