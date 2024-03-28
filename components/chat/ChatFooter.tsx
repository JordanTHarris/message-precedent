import { PlusCircle } from "lucide-react";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAutosizeTextArea from "@/lib/hooks/use-autosize-textarea";

function ChatFooter({ user }: { user: any }) {
  const [message, setMessage] = useState("");
  let formRef = useRef(null);
  let textRef = useRef<HTMLTextAreaElement>(null);
  // const socket = useSocket();

  const displayName = user.name ?? user.username;

  // Resizes text area to fit the content
  useAutosizeTextArea(textRef.current, message);

  function handleTyping(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Only allow actual characters to be typed
    if (
      e.key.charCodeAt(0) >= 32 &&
      e.key.charCodeAt(0) <= 126 &&
      e.key.length === 1
    ) {
      // socket?.emit("typing", `${displayName} is typing`);
    }
    // on enter
    else if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      return handleSendMessage(e);
    }
  }

  function handleSendMessage(e: any) {
    e.preventDefault();
    const formattedMessage = message.trim();

    if (formattedMessage && user) {
      // socket?.emit("message", {
      //   text: formattedMessage,
      //   name: displayName,
      //   time: Date.now(),
      //   id: `${socket.id}${Math.random()}`,
      //   socketID: socket.id,
      // });
    }

    console.log({ userName: localStorage.getItem("userName"), mess: message });
    setMessage("");
  }

  return (
    <div className="bg-transparent p-2">
      {/* <p className="text-sm text-muted-foreground">{typingStatus}</p> */}
      <div className="items-top flex gap-2">
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
        <form
          className="flex flex-1 gap-2"
          onSubmit={handleSendMessage}
          ref={formRef}
        >
          <Textarea
            className="no-scrollbar min-h-[40px] flex-1 resize-none"
            placeholder="Type your message here."
            id="message-2"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
            value={message}
            rows={1}
            ref={textRef}
            // autoFocus
          />
        </form>
      </div>
    </div>
  );
}

export default ChatFooter;
