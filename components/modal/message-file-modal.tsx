"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { FileUpload } from "@/components/shared/custom-file-upload";
import { SpinningOverlay } from "@/components/shared/spinning-overlay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/lib/hooks/use-modal-store";
import { useUploadThing } from "@/lib/uploadthing";

const formSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "No files selected"),
});

export function MessageFileModal() {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "messageFile";
  const { apiUrl, query } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });
  const isLoading = form.formState.isSubmitting;

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing("messageFile", {
    onClientUploadComplete: (res) => {
      toast.success("Uploaded successfully");
    },
    onUploadError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
    onUploadBegin: () => {
      toast.info("Upload has begun");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("onSubmit", values);
    const fileSelected = values.files?.[0] || null;
    let newFileUrl = "";

    if (fileSelected) {
      const uploadedFiles = await startUpload(values.files || []);
      newFileUrl = uploadedFiles?.[0]?.url || "";
    }

    try {
      if (newFileUrl) {
        const url = qs.stringifyUrl({
          url: apiUrl || "",
          query,
        });

        await axios.post(url, { fileUrl: newFileUrl, content: newFileUrl });

        form.reset();
        router.refresh();
        onClose();
      } else {
        toast.error("No changes made to server");
      }
    } catch (error) {
      toast.error("Failed to update server");

      // Delete uploaded file if db update fails
      try {
        await axios.delete(`/api/uploadthing?url=${newFileUrl}`);
      } catch (deleteError) {
        console.log(`Failed to delete old image`);
      }
    }
  }

  function handleClose() {
    if (!isLoading) {
      form.reset();
      onClose();
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="pb-2">
          <DialogTitle>Add an attachment</DialogTitle>
          <DialogDescription>Send a file as a message</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          {isLoading && (
            <SpinningOverlay>
              <Loader2 className="h-20 w-20" />
            </SpinningOverlay>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <FileUpload
                        endpoint="messageFile"
                        onChange={field.onChange}
                        value={field.value}
                        startUpload={startUpload}
                        permittedFileInfo={permittedFileInfo}
                        isUploading={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="">
              <Button variant="default" disabled={isLoading} className="w-full">
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
