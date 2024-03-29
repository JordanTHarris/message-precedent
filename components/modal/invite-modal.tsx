"use client";

import axios from "axios";
import { Check, Clipboard, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/lib/hooks/use-modal-store";
import { useOrigin } from "@/lib/hooks/use-origin";

export function InviteModal() {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  function onCopy() {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  async function onNew() {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
        {},
      );
      // reload modal with new invite code
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent hideCloseButton>
        <DialogHeader className="pb-2">
          <DialogTitle>Invite friends</DialogTitle>
          {/* <DialogDescription>
            Liven up your server by giving it a name and an image. You can
            change this later.
          </DialogDescription> */}
        </DialogHeader>
        <div className="mt-2 flex items-center gap-x-2">
          <div className="flex flex-1 flex-col justify-center space-y-2">
            <Label htmlFor="invite-link">Invite Link</Label>
            <div className="flex items-center space-x-2">
              <Input
                name="invite-link"
                className=""
                value={inviteUrl}
                disabled={isLoading}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onCopy}
                disabled={isLoading}
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Clipboard className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <Button variant="link" onClick={onNew} disabled={isLoading}>
          Generate a new link
          <RefreshCw className="ml-2 h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
