import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata, Viewport } from "next";
import Nav from "@/components/layout/nav";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { fontOpenSans, fontInter } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";

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
      <body className={cn("bg-background font-sans antialiased", fontInter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SocketProvider>
            <QueryProvider>
              <Nav />
              <div className="h-[100dvh]">
                {props.children}
                {props.modal}
              </div>
              <ModalProvider />
              <Toaster richColors />
            </QueryProvider>
          </SocketProvider>
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
