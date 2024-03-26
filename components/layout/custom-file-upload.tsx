import { useDropzone } from "@uploadthing/react";
import { FileImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

export function FileUpload({ onChange, value, endpoint }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const selectedFileUrl = files.length > 0 ? URL.createObjectURL(files[0]) : "";

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(endpoint, {
    onClientUploadComplete: () => {
      toast.success("Uploaded successfully");
    },
    onUploadError: () => {
      toast.error("Error occurred while uploading");
    },
    onUploadBegin: () => {
      toast.info("Upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="flex flex-col items-center gap-4 border border-dashed p-16"
      >
        <input {...getInputProps()} disabled={files.length > 0} />
        <div className="relative h-24 w-24">
          {selectedFileUrl ? (
            <>
              <Image
                src={selectedFileUrl}
                alt="Uploaded image"
                fill
                className="rounded-full"
              />
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute right-0 top-0 h-8 w-8 rounded-full hover:bg-destructive"
              >
                <X onClick={() => setFiles([])} />
              </Button>
            </>
          ) : (
            <FileImageIcon className="h-full w-full" />
          )}
        </div>
      </div>
      <Button
        type="button"
        disabled={files.length === 0}
        onClick={() => startUpload(files)}
      >
        Upload
      </Button>
    </>
  );
}
