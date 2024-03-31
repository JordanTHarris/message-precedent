"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Button
      variant="ghost"
      // size="icon"
      onClick={toggleTheme}
      className={cn(className)}
    >
      <SunIcon
        className={cn(
          className,
          "absolute rotate-0 scale-75 transition-all dark:-rotate-90 dark:scale-0",
        )}
      />
      <MoonIcon
        className={cn(
          className,
          "absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-75",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
