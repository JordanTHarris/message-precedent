import { useDropzone } from "@uploadthing/react";
import { FileImageIcon, X } from "lucide-react";
import Image from "next/image";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { toast } from "sonner";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { uploadFiles, useUploadThing } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  value?: File[] | null;
  endpoint: "serverImage" | "messageFile";
  startUpload: (files: File[]) => void;
  permittedFileInfo: any;
  isUploading?: boolean;
}

// export function FileUpload({ onChange, value, endpoint }: FileUploadProps) {
export function FileUpload({
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

  // const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
  //   endpoint,
  //   {
  //     onClientUploadComplete: (res) => {
  //       // onChange(res?.[0].url);
  //       toast.success("Uploaded successfully");
  //     },
  //     onUploadError: (error) => {
  //       toast.error(`Upload failed: ${error.message}`);
  //     },
  //     onUploadBegin: () => {
  //       toast.info("Upload has begun");
  //     },
  //   },
  // );

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
        className="flex flex-col items-center gap-4 rounded-xl border border-dashed p-16"
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
                <X onClick={() => removeFile()} />
              </Button>
            </>
          ) : (
            <FileImageIcon className="h-full w-full" />
          )}
        </div>
      </div>
      {/* <Button
        type="button"
        disabled={files.length === 0}
        onClick={() => startUpload(files)}
      >
        Upload
      </Button> */}
    </>
  );
}
