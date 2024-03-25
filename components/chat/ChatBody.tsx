import { DateTime } from "luxon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { getUserImgSrc } from '#app/utils/misc';

function ChatBody({
  messages,
  lastMessageRef,
  typingStatus,
  user,
  server,
}: {
  messages: Array<unknown>;
  lastMessageRef: any;
  typingStatus: string;
  user: any;
  server: any;
}) {
  function formatDate(date: Date) {
    return DateTime.fromJSDate(date).toFormat("MMM d, h:mm a");
  }

  return (
    <>
      {server && (
        <div className="flex items-center justify-between border-b-2 border-input bg-background p-3">
          <p className="text-lg font-semibold">{server?.name}</p>
          <p className="text-sm text-muted-foreground">{server?.inviteCode}</p>
        </div>
      )}

      <ScrollArea className="flex-1 p-2 pb-8">
        {messages.map((message: any) => (
          <div className="bg-background" key={message.id}>
            <div className="space-y-1 p-2 text-left">
              <div className="flex gap-5">
                <Avatar className="mt-1 bg-secondary">
                  <AvatarImage
                    // src={getUserImgSrc(user.image?.id)}
                    src="https://i.pravatar.cc/300"
                    alt="Avatar"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <p className="text-base font-semibold">{message.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(new Date(message.time))}
                    </p>
                  </div>
                  <p className="whitespace-pre text-base font-light">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <p className="absolute bottom-0 left-2/4 -translate-x-2/4 text-sm text-muted-foreground">
          {typingStatus}
        </p>

        <div ref={lastMessageRef} />
      </ScrollArea>
    </>
  );
}

export default ChatBody;
