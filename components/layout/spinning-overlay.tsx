import { cn } from "@/lib/utils";

export function SpinningOverlay({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute z-10 flex h-full w-full items-center justify-center bg-background/60 ",
        className,
      )}
    >
      <div className="animate-spin">{children}</div>
    </div>
  );
}
