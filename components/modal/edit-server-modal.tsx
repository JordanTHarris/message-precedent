"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/lib/hooks/use-modal-store";
import { useUploadThing } from "@/lib/uploadthing";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Server name is required" }),
    files: z.array(z.instanceof(File)).optional(),
    imageUrl: z.string().url().optional(),
  })
  .refine(
    (data) => {
      const hasFiles = Boolean(data.files?.length);
      const hasImageUrl = Boolean(data.imageUrl);

      if (!hasFiles && !hasImageUrl) {
        return false;
      }

      return true;
    },
    {
      message: "Server image is required",
    },
  );

export function EditServerModal() {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editServer";
  const { server } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      files: [],
      imageUrl: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [server, form]);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing("serverImage", {
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
    // TODO: resize image to 512x512 or something before upload

    const currentFileUrl = server?.imageUrl;
    const fileSelected = values.files?.[0] || null;
    const isNameChanged = server?.name !== values.name;
    let newFileUrl = "";

    if (fileSelected) {
      const uploadedFiles = await startUpload(values.files || []);
      newFileUrl = uploadedFiles?.[0]?.url || "";
    }

    try {
      if (isNameChanged || newFileUrl) {
        await axios.patch(`/api/servers/${server?.id}`, {
          name: values.name,
          imageUrl: newFileUrl || currentFileUrl,
        });

        // Delete delete old image if new one is uploaded and added
        if (newFileUrl) {
          try {
            await axios.delete(`/api/uploadthing?url=${currentFileUrl}`);
          } catch (deleteError) {
            console.log(`Failed to delete old image`);
          }
        }

        form.reset();
        router.refresh();
        onClose();
      } else {
        toast.error("No changes made to server");
      }
    } catch (error) {
      toast.error("Failed to update server");

      // Delete uploaded file if db update fails
      if (currentFileUrl) {
        try {
          await axios.delete(`/api/uploadthing?url=${newFileUrl}`);
        } catch (deleteError) {
          console.log(`Failed to delete old image`);
        }
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
          <DialogTitle>Edit your server</DialogTitle>
          <DialogDescription>
            Liven up your server with a name and an image
          </DialogDescription>
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
                        endpoint="serverImage"
                        onChange={field.onChange}
                        value={field.value}
                        fileUrl={server?.imageUrl}
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

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Server name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="">
              <Button variant="default" disabled={isLoading} className="w-full">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
