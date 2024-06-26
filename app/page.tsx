// "use client";

import ParticlesComponent from "@/components/home/particles";

export default async function Home() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center py-24">
      {/* <ParticlesComponent className="absolute inset-0 -z-10 h-[100dvh] w-screen" /> */}
      <div className="flex select-none flex-col items-center justify-center gap-5">
        <h1 className="animate-linear bg-gradient-to-r from-indigo-600 via-teal-500 to-indigo-600 bg-[length:200%_auto] bg-clip-text text-center text-6xl font-bold leading-tight text-transparent lg:text-8xl lg:leading-tight">
          Prophet Message
        </h1>
        <p className="text-center text-lg text-muted-foreground lg:text-xl">
          New message app built with Next.js, Tailwind, and Prisma.
        </p>
      </div>
    </div>
  );
}
