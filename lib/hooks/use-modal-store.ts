import { Channel, ChannelType, Member, Server, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createChannel"
  | "createServer"
  | "deleteChannel"
  | "deleteMessage"
  | "deleteServer"
  | "editChannel"
  | "editServer"
  | "invite"
  | "kickMember"
  | "leaveServer"
  | "members"
  | "messageFile";

interface ModalData {
  server?: Server;
  channel?: Channel;
  member?: Member & { user: User };
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
