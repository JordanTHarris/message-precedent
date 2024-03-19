"use client";

import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Popover from "@/components/shared/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import prisma from "@/lib/prisma";

export default async function UserDropdown({ session }: { session: Session }) {
  const { name, email, image } = session?.user || {};
  const router = useRouter();

  if (!email) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shrink-0 rounded-full">
        <Image
          alt={email}
          src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
          width={30}
          height={30}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            {name && <p>{name}</p>}
            <p className="truncate text-sm text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <p className="text-sm">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
