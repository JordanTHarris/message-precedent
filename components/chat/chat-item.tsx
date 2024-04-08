"use client";

import { Member, MemberRole, User } from "@prisma/client";
import { Crown, Edit, FileIcon, ShieldCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ActionTooltip } from "@/components/shared/action-tooltip";
import UserAvatar from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";

const roleIcons = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-emerald-500" />,
  // ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
  ADMIN: <Crown className="ml-2 h-4 w-4 text-amber-500" />,
};

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & { user: User };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

export function ChatItem({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  return (
    <div className="group relative flex w-full items-center p-4 transition hover:bg-black/5">
      <div className="group flex w-full items-start gap-x-2">
        <div className="cursor-pointer transition hover:drop-shadow-md">
          <UserAvatar
            src={member.user.image as string}
            fallback={member.user.name as string}
            alt={member.user.name as string}
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="cursor-pointer text-sm font-semibold hover:underline">
                {member.user.name}
              </p>
              <ActionTooltip label={member.role}>{roleIcons[member.role]}</ActionTooltip>
            </div>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          {/* TODO: make link fit to image width instead of filling the container */}
          {isImage && (
            <div className="relative mt-2 h-40 max-w-full">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary"
              >
                <Image
                  src={fileUrl}
                  alt={content}
                  layout="fill"
                  objectFit="contain"
                  className="object-left"
                />
              </a>
            </div>
          )}
          {isPDF && (
            <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-chat-foreground",
                deleted && "mt-1 text-xs italic text-muted-foreground",
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="mx-2 text-[10px] text-muted-foreground">(edited)</span>
              )}
            </p>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="absolute -top-2 right-5 hidden items-center gap-x-2 rounded-sm border bg-tertiary p-1 group-hover:flex">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                className="ml-auto h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={() => setIsEditing(true)}
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash2 className="ml-auto h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
}
