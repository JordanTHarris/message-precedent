"use client";

import { useRouter } from "next/navigation";
import { SignInForm } from "@/components/layout/sign-in-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const SignInModal = () => {
  const router = useRouter();

  function onOpenChange(open: boolean) {
    if (!open) {
      router.back();
    }
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign In</DialogTitle>
          <DialogDescription>
            Use one of the provided methods below
          </DialogDescription>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};
