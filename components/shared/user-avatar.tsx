import { User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
  alt?: string;
}

export default function UserAvatar({
  src,
  fallback,
  className,
  alt,
}: UserAvatarProps) {
  // get two letters from a fallback name
  const fallbackName =
    fallback
      ?.split(" ")
      ?.map((n) => n[0])
      .join("")
      .toUpperCase() || "";

  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt || "User Avatar"} className={className} />
      <AvatarFallback>
        {fallback ? fallbackName : <User2 className={className} />}
      </AvatarFallback>
    </Avatar>
  );
}
