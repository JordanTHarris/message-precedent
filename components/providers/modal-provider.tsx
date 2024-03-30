"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/modal/create-server-modal";
import { EditServerModal } from "@/components/modal/edit-server-modal";
import { InviteModal } from "@/components/modal/invite-modal";
import { MembersModal } from "@/components/modal/members-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
    </>
  );
}
