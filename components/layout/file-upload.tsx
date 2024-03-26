"use client";

import { X, Server } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

export function FileUpload({ onChange, value, endpoint }: FileUploadProps) {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-24 w-24">
        <Image src={value} alt="Uploaded image" fill className="rounded-full" />
        <Button
          size={"icon"}
          variant={"ghost"}
          className="absolute right-0 top-0 h-8 w-8 rounded-full hover:bg-destructive"
        >
          <X onClick={() => onChange("")} />
        </Button>
      </div>
    );
  }

  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          toast.success(`${res?.[0].name} uploaded successfully`);
        }}
        onBeforeUploadBegin={(files) => {
          console.log(files);
          return files;
        }}
        onUploadError={(e) => {
          // Todo: handle error
          toast.error(e.message);
        }}
      />
    </>
  );
}
