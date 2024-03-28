interface ProfileLayoutProps {
  children?: React.ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center py-24">
      {children}
    </div>
  );
}
