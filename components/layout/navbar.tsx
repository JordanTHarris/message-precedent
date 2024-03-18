"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../home/ThemeToggle";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled ? "border-b bg-background/50 backdrop-blur-xl" : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-semibold">
            Prophet Message
          </Link>
          <div className="flex items-center gap-2">
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
