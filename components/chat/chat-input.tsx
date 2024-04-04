"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAutosizeTextArea from "@/lib/hooks/use-autosize-textarea";
import { useRef } from "react";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "channel" | "conversation";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export default function ChatInput({ apiUrl, query, name, type }: ChatInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(value: z.infer<typeof formSchema>) {
    // try {
    //   const url = qs.stringifyUrl({
    //     url: apiUrl,
    //     query: {
    //       ...query,
    //       name,
    //       type,
    //     },
    //   });
    //   await axios.post(url, value);
    //   form.reset();
    // } catch (error) {
    //   console.log(error);
    // }
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
                <div className="relative p-4 pb-6">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {}}
                    className="absolute left-8 top-7 flex h-[24px] w-[24px] items-center justify-center rounded-full p-1 hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Input
                    disabled={isLoading}
                    className="border-0 border-none bg-secondary/40 px-14 py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                    {...field}
                  />
                  {/* <div className="absolute right-8 top-7">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div> */}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
