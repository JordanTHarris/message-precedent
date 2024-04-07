"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EmojiPicker } from "@/components/shared/emoji-picker";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/lib/hooks/use-modal-store";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "channel" | "conversation";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export function ChatInput({ apiUrl, query, name, type }: ChatInputProps) {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleTyping(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Only allow actual characters to be typed
    if (e.key.charCodeAt(0) >= 32 && e.key.charCodeAt(0) <= 126 && e.key.length === 1) {
      // socket?.emit('typing', `${displayName} is typing`);
    }
    // on enter
    else if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      return form.handleSubmit(onSubmit)();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-start gap-2 p-3 pb-4 pt-0">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="mt-2 h-6 w-6 items-center justify-center rounded-full bg-muted-foreground p-1 hover:bg-foreground hover:text-foreground"
                  >
                    <Plus className="flex-shrink-0 text-chat" />
                  </Button>
                  <Textarea
                    className="no-scrollbar min-h-10 resize-none border-0 border-none bg-secondary/40 text-chat-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                    disabled={isLoading}
                    onKeyDown={handleTyping}
                    rows={1}
                    autoResize
                    {...field}
                  />
                  <div className="mt-2">
                    <EmojiPicker
                      onChange={(emoji: string) => {
                        field.onChange(`${field.value}${emoji}`);
                      }}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
