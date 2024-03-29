"use client";

import { type User } from "@prisma/client";
import { Home, LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser({ user, size = 48 }: { user: User; size?: number }) {
  const { name, email, image } = user || {};
  const router = useRouter();

  if (!email) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shrink-0 rounded-full">
        <Image
          alt={email}
          src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
          width={48}
          height={48}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
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
