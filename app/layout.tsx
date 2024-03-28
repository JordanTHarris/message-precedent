import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/home/theme-provider";
import Nav from "@/components/layout/nav";
import { Toaster } from "@/components/ui/sonner";
import { sfPro, fontSans } from "@/fonts/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Prophet Message",
  description: "New message app built with Next.js, Tailwind, and Prisma.",
  metadataBase: new URL("https://message-precedent.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <div className="min-h-[100dvh]">
            {props.children}
            {props.modal}
          </div>
          <Toaster richColors />
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
