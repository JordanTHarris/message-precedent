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
  fileUrl?: string;
  endpoint: "serverImage" | "messageFile";
  startUpload: (files: File[]) => void;
  permittedFileInfo: any;
  isUploading?: boolean;
}

export function FileUpload({
  className,
  onChange,
  value,
  fileUrl,
  endpoint,
  startUpload,
  permittedFileInfo,
  isUploading,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>(value || []);
  const [loadedFileUrl, setLoadedFileUrl] = useState<string | null>(fileUrl || null);
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
    // setLoadedFileUrl(null);
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
        "flex flex-col items-center gap-4 rounded-xl border border-dashed p-10 hover:cursor-pointer",
        className,
        dragColor,
      )}
    >
      <input {...getInputProps()} />
      {endpoint === "serverImage" && (
        <div className="relative h-24 w-24">
          {selectedFileUrl || loadedFileUrl ? (
            <>
              <Image
                src={selectedFileUrl ? selectedFileUrl : loadedFileUrl || ""}
                alt="Uploaded image"
                sizes="50vw"
                fill
                className="rounded-full"
              />
              {selectedFileUrl && (
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="absolute right-0 top-0 h-8 w-8 rounded-full hover:bg-destructive"
                  // onClick={() => removeFile()}
                  onClickCapture={() => removeFile()}
                >
                  <X />
                </Button>
              )}
            </>
          ) : (
            <FileImageIcon className="h-full w-full" />
          )}
        </div>
      )}
      {endpoint === "messageFile" && (
        <div className="relative h-48 w-48">
          {selectedFileUrl || loadedFileUrl ? (
            <>
              <Image
                src={selectedFileUrl ? selectedFileUrl : loadedFileUrl || ""}
                alt="Uploaded image"
                sizes="50vw"
                fill
                className="object-contain"
              />
              {selectedFileUrl && (
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="absolute right-0 top-0 h-8 w-8 rounded-full hover:bg-destructive"
                  onClickCapture={() => removeFile()}
                >
                  <X />
                </Button>
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileImageIcon className="h-24 w-24" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
