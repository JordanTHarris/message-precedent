"use client";

import { Member, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { ChatItem } from "@/components/chat/chat-item";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { useChatQuery } from "@/lib/hooks/use-chat-query";
import { ScrollArea } from "../ui/scroll-area";

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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
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
    <ScrollArea className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="flex-1">
        <ChatWelcome name={name} type={type} />
        <div className="mt-auto flex flex-col-reverse">
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.items.map((message: MessageWithMemberWithUser) => (
                // <div key={message.id}>{message.content}</div>
                <ChatItem
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  member={message.member}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  fileUrl={message.fileUrl}
                  deleted={message.deleted}
                  currentMember={member}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
