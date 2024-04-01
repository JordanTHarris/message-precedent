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

export function DeleteServerModal() {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);
      await axios.delete(`/api/uploadthing?url=${server?.imageUrl}`);

      onClose();
      router.refresh();
      toast.success(`Deleted ${server?.name}`);
      await redirectToChat();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="border-destructive">
        {isLoading && (
          <SpinningOverlay>
            <Loader2 className="h-20 w-20" />
          </SpinningOverlay>
        )}
        <DialogHeader className="pb-2">
          <DialogTitle className="text-destructive">Delete Server</DialogTitle>
          <DialogDescription>
            Are you sure you want to do delete{" "}
            <span className="font-semibold text-foreground">{server?.name}</span>
            ?<br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={isLoading} onClick={onClick}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
