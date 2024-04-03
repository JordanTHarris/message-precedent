"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { SpinningOverlay } from "@/components/shared/spinning-overlay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/lib/hooks/use-modal-store";

export function KickMemberModal() {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "kickMember";
  const { server, member } = data;

  const [isLoading, setIsLoading] = useState(false);

  async function onKick(memberId?: string) {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function onCloseAndReopen() {
    onClose();
    onOpen("members", { server });
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onCloseAndReopen}>
      <DialogContent className="border-destructive">
        {isLoading && (
          <SpinningOverlay>
            <Loader2 className="h-20 w-20" />
          </SpinningOverlay>
        )}
        <DialogHeader className="pb-2">
          <DialogTitle className="text-destructive">Kick Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to do kick{" "}
            <span className="font-semibold text-foreground">{member?.user?.name}</span>
            ?<br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isLoading} onClick={onCloseAndReopen}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={() => onKick(member?.id)}
          >
            Kick
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
