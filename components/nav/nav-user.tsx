"use client";

import { type User } from "@prisma/client";
import { Home, LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function NavUser({ user, size = 48 }: { user: User; size?: number }) {
  const [open, setOpen] = useState(false);
  const { name, email, image } = user || {};
  const router = useRouter();

  if (!email) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="shrink-0 rounded-full">
        <Image
          alt={email}
          src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
          width={48}
          height={48}
          className={cn(
            "rounded-[24px] transition-all hover:rounded-[16px]",
            open && "rounded-[16px]",
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        side="right"
      >
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <UserIcon className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            {name && <p>{name}</p>}
            <p className="truncate text-sm text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/")}>
          <Home className="mr-2 h-4 w-4" />
          <p>Home</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <p className="text-sm">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
