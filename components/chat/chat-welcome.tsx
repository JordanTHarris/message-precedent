"use client";

import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export function ChatWelcome({ name, type }: ChatWelcomeProps) {
  return (
    <div className="mb-4 space-y-2 px-4">
      {/* {type === "channel" && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tertiary">
          <Hash className="h-10 w-10 text-chat-foreground" />
        </div>
      )} */}
      <p className="text-xl font-bold md:text-3xl">
        {type === "channel" ? "Welcome to #" : ""}
        {name} 😄
      </p>
      <p className="text-sm text-chat-foreground">
        {type === "channel"
          ? `This is the start of #${name}`
          : `Start a conversation with ${name}`}
      </p>
    </div>
  );
}
