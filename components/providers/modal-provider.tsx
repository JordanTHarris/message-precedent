"use client";

import { useEffect, useState } from "react";
import { CreateChannelModal } from "@/components/modal/create-channel-modal";
import { CreateServerModal } from "@/components/modal/create-server-modal";
import { DeleteChannelModal } from "@/components/modal/delete-channel-modal";
import { DeleteMessageModal } from "@/components/modal/delete-message-modal";
import { DeleteServerModal } from "@/components/modal/delete-server-modal";
import { EditChannelModal } from "@/components/modal/edit-channel-modal";
import { EditServerModal } from "@/components/modal/edit-server-modal";
import { InviteModal } from "@/components/modal/invite-modal";
import { KickMemberModal } from "@/components/modal/kick-member-modal";
import { LeaveServerModal } from "@/components/modal/leave-server-modal";
import { MembersModal } from "@/components/modal/members-modal";
import { MessageFileModal } from "@/components/modal/message-file-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <CreateChannelModal />
      <DeleteChannelModal />
      <DeleteMessageModal />
      <DeleteServerModal />
      <EditChannelModal />
      <EditServerModal />
      <InviteModal />
      <KickMemberModal />
      <LeaveServerModal />
      <MembersModal />
      <MessageFileModal />
    </>
  );
}
