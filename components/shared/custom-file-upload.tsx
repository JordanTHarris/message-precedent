import { useDropzone } from "@uploadthing/react";
import { FileImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  className?: string;
  onChange: (files: File[]) => void;
  value?: File[] | null;
  endpoint: "serverImage" | "messageFile";
  startUpload: (files: File[]) => void;
  permittedFileInfo: any;
  isUploading?: boolean;
}

export function FileUpload({
  className,
  onChange,
  value,
  endpoint,
  startUpload,
  permittedFileInfo,
  isUploading,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>(value || []);
  const selectedFileUrl = files.length > 0 ? URL.createObjectURL(files[0]) : "";

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onChange(acceptedFiles);
    },
    [onChange],
  );

  const removeFile = () => {
    setFiles([]);
    onChange([]);
  };

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    maxFiles: 1,
  });

  const dragColor = isDragActive ? "bg-secondary" : "bg-background";

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center gap-4 rounded-xl border border-dashed p-16 hover:cursor-pointer",
        className,
        dragColor,
      )}
    >
      <input {...getInputProps()} />
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
              // onClick={() => removeFile()}
              onClickCapture={() => removeFile()}
            >
              <X />
            </Button>
          </>
        ) : (
          <FileImageIcon className="h-full w-full" />
        )}
      </div>
    </div>
  );
}
