"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, User } from "@prisma/client";
import axios from "axios";
import { Crown, Edit2, FileIcon, ShieldCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ActionTooltip } from "@/components/shared/action-tooltip";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/lib/hooks/use-modal-store";
import { cn } from "@/lib/utils";

const roleIcons = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-emerald-500" />,
  // ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
  ADMIN: <Crown className="ml-2 h-4 w-4 text-amber-500" />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

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
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const [imageWidth, setImageWidth] = useState(1);
  const [imageHeight, setImageHeight] = useState(1);
  const MAX_IMAGE_HEIGHT = 150; // px

  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content, form]);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" || e.keyCode === 27) {
        setIsEditing(false);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  function onCancel() {
    form.reset();
    setIsEditing(false);
  }

  function handleTyping(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      return form.handleSubmit(onSubmit)();
    }
  }

  function onMemberClick() {
    if (member.id === currentMember.id) return;

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  }

  return (
    <div className="group relative flex w-full items-center p-4 transition hover:bg-black/5">
      <div className="group flex w-full items-start gap-x-2">
        <div
          className="cursor-pointer transition hover:drop-shadow-md"
          onClick={onMemberClick}
        >
          <UserAvatar
            src={member.user.image as string}
            fallback={member.user.name as string}
            alt={member.user.name as string}
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                className="cursor-pointer text-sm font-semibold hover:underline"
                onClick={onMemberClick}
              >
                {member.user.name}
              </p>
              <ActionTooltip label={member.role}>{roleIcons[member.role]}</ActionTooltip>
            </div>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          {isImage && (
            <a
              className="relative mt-2"
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: `${MAX_IMAGE_HEIGHT}`,
                maxWidth: `${imageWidth}px`,
                minHeight: `${imageHeight}px`,
              }}
            >
              <Image
                src={fileUrl}
                alt={content}
                className="object-contain object-left"
                sizes="(max-width: 640px) 100vw, 640px"
                fill
                onLoad={(e) => {
                  const aspectRatio =
                    e.currentTarget.naturalWidth / e.currentTarget.naturalHeight;
                  const maxWidth = MAX_IMAGE_HEIGHT * aspectRatio;
                  setImageWidth(maxWidth);
                  setImageHeight(MAX_IMAGE_HEIGHT);
                }}
              />
            </a>
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
                "whitespace-pre-wrap text-sm text-chat-foreground",
                deleted && "mt-1 text-xs italic text-muted-foreground",
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="mx-2 text-[10px] text-muted-foreground">(edited)</span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                ref={formRef}
                className="flex w-full items-center gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Textarea
                            disabled={isLoading}
                            className="no-scrollbar min-h-10 resize-none border-0 border-none bg-chatsecondary pr-10 text-chat-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Edited message"
                            rows={1}
                            autoResize
                            autoFocus
                            onKeyDown={handleTyping}
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="default">
                  Save
                </Button>
              </form>
              <span className="text-xs text-muted-foreground">
                Press escape to{" "}
                <span
                  className="cursor-pointer text-primary hover:underline"
                  onClick={() => onCancel()}
                >
                  cancel
                </span>
                , enter to{" "}
                <span
                  className="cursor-pointer text-primary hover:underline"
                  onClick={() => formRef.current?.requestSubmit()}
                >
                  save
                </span>
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="absolute -top-2 right-5 hidden items-center gap-x-3 rounded-sm border bg-tertiary p-1 group-hover:flex">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit2
                className="ml-auto h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash2
              className="ml-auto h-5 w-5 cursor-pointer text-muted-foreground hover:text-destructive"
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
}
