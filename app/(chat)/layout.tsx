import { NavSidebar } from "@/components/nav/nav-sidebar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <div className="fixed inset-y-0 z-30 flex h-full w-[72px] flex-col ">
        <NavSidebar />
      </div>
      <main className="h-full pl-[72px]">{children}</main>
    </div>
  );
}
