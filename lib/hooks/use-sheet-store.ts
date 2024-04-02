import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  onOpenSidebar: (open: boolean) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: false,
  onOpenSidebar: (open) => set({ isOpen: open }),
}));
