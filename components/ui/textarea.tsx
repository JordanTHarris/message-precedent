"use client";

import * as React from "react";

import { useAutoResizeTextarea } from "@/lib/hooks/use-auto-resize-textarea";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, ...props }, ref) => {
    const { textAreaRef, updateTextareaHeight } = useAutoResizeTextarea(ref, autoResize);

    // resize the text area when the value changes so it works with resetting forms
    React.useEffect(() => {
      if (autoResize) {
        updateTextareaHeight();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textAreaRef.current?.value, updateTextareaHeight]);

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={textAreaRef}
        {...props}
        onTouchStart={(e) => (e.currentTarget.style.fontSize = "16px")}
        onBlur={(e) => (e.currentTarget.style.fontSize = "")}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
