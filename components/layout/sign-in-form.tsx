"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { LoadingDots, Google, Discord } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

export const SignInForm = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const emailLoading = form.formState.isSubmitting;

  const onEmailSubmit = async (values: z.infer<typeof formSchema>) => {
    const email = values.email;

    const res = await signIn("email", {
      email: email,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Make sure you have entered a valid email");
    } else if (res?.ok) {
      toast.success("Check your email for the login link");
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-6">
        <Button
          disabled={googleLoading}
          variant="outline"
          className="flex flex-1 items-center justify-center space-x-3 transition-all duration-75 focus:outline-none"
          onClick={() => {
            setGoogleLoading(true);
            signIn("google");
          }}
        >
          {googleLoading ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              <Google className="h-5 w-5" />
              <p>Google</p>
            </>
          )}
        </Button>
        <Button
          disabled={discordLoading}
          variant="outline"
          className="flex flex-1 items-center justify-center space-x-3 transition-all duration-75 focus:outline-none"
          onClick={() => {
            setDiscordLoading(true);
            signIn("discord");
          }}
        >
          {discordLoading ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              <Discord className="h-5 w-5" />
              <p>Discord</p>
            </>
          )}
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onEmailSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={emailLoading}
                    {...field}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" disabled={emailLoading}>
            Generate Magic Link
          </Button>
        </form>
      </Form>
    </div>
  );
};
