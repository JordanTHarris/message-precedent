"use client";

import { Member, User } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Crown,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import UserAvatar from "@/components/shared/user-avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/lib/hooks/use-modal-store";
import { ServerWithMembersWithUsers } from "@/types/types";

const roleIcons = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-emerald-500" />,
  // ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
  ADMIN: <Crown className="ml-2 h-4 w-4 text-amber-500" />,
};

export function MembersModal() {
  const router = useRouter();
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithUsers };

  async function onRoleChange(memberId: string, role: string) {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }

  async function onKick(member: Member & { user: User }) {
    onOpen("kickMember", { server, member }); // open confirm dialog
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="pb-2">
          <DialogTitle className="">Manage Members</DialogTitle>
          <DialogDescription>{server?.members?.length} Members</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-x-4">
              <UserAvatar
                src={member.user.image || ""}
                alt={member.user.name || ""}
                fallback={member.user.name || ""}
                className="h-7 w-7 md:h-10 md:w-10"
              />
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center text-sm font-semibold">
                  {member.user.name}
                  {roleIcons[member.role]}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(member.createdAt).toLocaleDateString()}
                </p>
              </div>
              {server.userId !== member.userId && loadingId !== member.id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="mr-2 h-4 w-4" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.id, "GUEST")}
                            >
                              <Shield className="mr-2 h-4 w-4 text-sky-500" />
                              <p className="mr-2">Guest</p>
                              {member.role === "GUEST" && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.id, "MODERATOR")}
                            >
                              <ShieldCheck className="mr-2 h-4 w-4 text-emerald-500" />
                              <p className="mr-2">Moderator</p>
                              {member.role === "MODERATOR" && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive hover:!bg-destructive hover:!text-destructive-foreground"
                        onClick={() => onKick(member)}
                      >
                        <Gavel className="text mr-2 h-4 w-4" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === member.id && (
                <Loader2 className="ml-auto h-4 w-4 animate-spin" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
