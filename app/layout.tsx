import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/home/theme-provider";
import Nav from "@/components/layout/nav";
import { cn } from "@/lib/utils";
import { sfPro, fontSans } from "./fonts";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-24">
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
