"use client";

import { Member, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useRef } from "react";
import { ChatItem } from "@/components/chat/chat-item";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { ScrollArea, ScrollAreaViewport } from "@/components/ui/scroll-area";
import { useChatQuery } from "@/lib/hooks/use-chat-query";
import { useChatScroll } from "@/lib/hooks/use-chat-scroll";
import { useChatSocket } from "@/lib/hooks/use-chat-socket";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithUser = Message & {
  member: Member & {
    user: User;
  };
};

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export function ChatMessages({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });

  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-chat-foreground" />
        <p className="text-sm text-chat-foreground">Loading messages...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ServerCrash className="my-4 h-7 w-7 text-chat-foreground" />
        <p className="text-sm text-chat-foreground">Something went wrong!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex flex-1 flex-col">
      <ScrollAreaViewport
        ref={chatRef}
        className="flex flex-1 flex-col overflow-y-auto py-4"
      >
        {!hasNextPage && <div className="flex-1" />}
        {!hasNextPage && <ChatWelcome type={type} name={name} />}
        {hasNextPage && (
          <div className="flex justify-center">
            {isFetchingNextPage ? (
              <Loader2 className="my-4 h-6 w-6 animate-spin text-chat-foreground" />
            ) : (
              <button
                onClick={() => fetchNextPage()}
                className="my-4 text-xs text-muted-foreground hover:text-chat-foreground"
              >
                Load more messages
              </button>
            )}
          </div>
        )}
        <div className="mt-auto flex flex-col-reverse">
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.items.map((message: MessageWithMemberWithUser) => (
                <ChatItem
                  key={message.id}
                  id={message.id}
                  currentMember={member}
                  member={message.member}
                  content={message.content}
                  fileUrl={message.fileUrl}
                  deleted={message.deleted}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                />
              ))}
            </Fragment>
          ))}
        </div>
        <div ref={bottomRef} />
      </ScrollAreaViewport>
    </ScrollArea>
  );
}
