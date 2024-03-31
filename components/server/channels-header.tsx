"use client";

import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash2,
  UserPlus2,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/lib/hooks/use-modal-store";
import { ServerWithMembersWithUsers } from "@/types/types";

interface ServerHeaderProps {
  server: ServerWithMembersWithUsers;
  role?: MemberRole;
}

export function ChannelsHeader({ server, role }: ServerHeaderProps) {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-12 w-full rounded-none border-b-2 border-secondary"
          >
            <p className="truncate text-base">{server.name}</p>
            <ChevronDown className="ml-auto h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="w-56"
        >
          {isModerator && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm text-primary"
              onClick={() => onOpen("invite", { server })}
            >
              Invite People
              <UserPlus2 className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm"
              onClick={() => onOpen("editServer", { server })}
            >
              Server Settings
              <Settings className="ml-auto h-4 w-4 " />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm"
              onClick={() => onOpen("members", { server })}
            >
              Manage Members
              <Users2 className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm"
              onClick={() => onOpen("createChannel")}
            >
              Create Channel
              <PlusCircle className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm text-destructive hover:!bg-destructive hover:!text-destructive-foreground"
              onClick={() => onOpen("deleteServer", { server })}
            >
              Delete Server
              <Trash2 className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm text-destructive hover:!bg-destructive hover:!text-destructive-foreground"
              onClick={() => onOpen("leaveServer", { server })}
            >
              Leave Server
              <LogOut className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
