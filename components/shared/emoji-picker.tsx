"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export function EmojiPicker({ onChange }: EmojiPickerProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="h-6 w-6 justify-center rounded-full text-muted-foreground hover:text-foreground" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={10}
        className="border-none bg-transparent shadow-none drop-shadow-none"
      >
        <Picker
          // dynamicWidth={true}
          data={data}
          theme={resolvedTheme}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          perLine={8}
        />
      </PopoverContent>
    </Popover>
  );
}
