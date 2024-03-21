"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../home/ThemeToggle";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <div className="fixed top-0 z-30 flex w-full justify-center backdrop-blur-lg transition-all">
        <div className="mx-5 flex h-12 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center text-2xl ">
            Prophet
          </Link>
          <div className="flex items-center gap-2">
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
            )}
            <ThemeToggle className="h-[30px] w-[30px]" />
          </div>
        </div>
      </div>
    </>
  );
}
