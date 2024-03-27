"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { FileUpload } from "@/components/layout/custom-file-upload";
import { SpinningOverlay } from "@/components/layout/spinning-overlay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/lib/uploadthing";

const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required" }),
  files: z
    .array(
      z.instanceof(File),
      // .refine((file) => file.size < 1024, 'File size must be less than 1kb'),
    )
    .min(1, "At least 1 file is required"),
  // .refine(
  //   (files) => files.every((file) => file.size < 1024),
  //   'File size must be less than 1kb',
  // ),
});

export function InitialModal() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      files: [],
    },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "serverImage",
    {
      onClientUploadComplete: (res) => {
        // onChange(res?.[0].url);
        toast.success("Uploaded successfully");
      },
      onUploadError: (error) => {
        toast.error(`Upload failed: ${error.message}`);
      },
      onUploadBegin: () => {
        toast.info("Upload has begun");
      },
    },
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: resize image to 512x512 or something before upload

    const uploadedFiles = await startUpload(values.files);
    const fileUrl = uploadedFiles?.[0]?.url;

    if (fileUrl) {
      try {
        await axios.post("/api/servers", {
          name: values.name,
          imageUrl: fileUrl,
        });
        form.reset();
        router.refresh();
        window.location.reload();
      } catch (error) {
        // Delete uploaded file if server creation fails
        await axios.delete("api/uploadthing", {
          data: { url: fileUrl },
        });
      }
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader className="pb-2">
          <DialogTitle>Customize your server</DialogTitle>
          <DialogDescription>
            Liven up your server by giving it a name and an image. You can
            change this later.
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
                      className=""
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
