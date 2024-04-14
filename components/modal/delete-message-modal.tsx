"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import qs from "query-string";
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

export function DeleteMessageModal() {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query: query,
      });

      await axios.delete(url);

      onClose();
      toast.success("Deleted message");
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
          <DialogTitle className="text-destructive">Delete Message</DialogTitle>
          <DialogDescription>
            Are you sure you want to do delete this message? <br />
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
