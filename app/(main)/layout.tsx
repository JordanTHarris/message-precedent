import { NavSidebar } from "@/components/nav/nav-sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <NavSidebar />
      </div>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
}
