"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserDropdown } from "@/components/shared/user-dropdown";
import { Button } from "@/components/ui/button";

export default function NavBar({ session }: { session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();

  const showNav = !pathname.startsWith("/servers");
  // && !pathname.startsWith("/login");

  if (!showNav) return null;

  return (
    <>
      <div className="fixed top-0 z-30 flex w-full justify-center backdrop-blur-lg transition-all">
        <div className="mx-5 flex h-12 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center text-2xl ">
            Prophet
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push("/chat")}>
              Chat
            </Button>
            {session ? (
              <>
                <UserDropdown session={session} />
              </>
            ) : (
              <Button
                disabled={pathname === "/login"}
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
            )}
            <ThemeToggle className="h-[30px] w-[30px]" />
          </div>
        </div>
      </div>
    </>
  );
}
