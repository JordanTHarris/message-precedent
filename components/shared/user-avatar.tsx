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
    <Avatar>
      <AvatarImage
        src={src}
        alt={alt || "User Avatar"}
        className={cn("h-7 w-7 md:h-10 md:w-10", className)}
      />
      <AvatarFallback>
        {fallback ? (
          fallbackName
        ) : (
          <User2 className="h-7 w-7 md:h-10 md:w-10" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
