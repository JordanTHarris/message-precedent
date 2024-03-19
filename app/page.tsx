export default async function Home() {
  return (
    <div className="max-w-xl px-5 xl:px-0">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-6xl font-semibold">Prophet Message</h1>
        <p className="text-center text-muted-foreground">
          New message app built with Next.js, Tailwind, and Prisma.
        </p>
      </div>
    </div>
  );
}
