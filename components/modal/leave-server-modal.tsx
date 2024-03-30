"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
import { redirectToChat } from "@/lib/redirect";

export function LeaveServerModal() {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  async function onLeave() {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);

      onClose();
      router.refresh();
      toast.success(`Left ${server?.name}`);
      await redirectToChat();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        {isLoading && (
          <SpinningOverlay>
            <Loader2 className="h-20 w-20" />
          </SpinningOverlay>
        )}
        <DialogHeader className="pb-2">
          <DialogTitle>Leave Server</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave{" "}
            <span className="font-semibold text-foreground">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={isLoading} onClick={onLeave}>
            Leave
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
