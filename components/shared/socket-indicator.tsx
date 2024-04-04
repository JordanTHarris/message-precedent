"use client";

import { useSocket } from "@/components/providers/socket-provider";

export function SocketIndicator() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return <div className="h-3 w-3 rounded-full bg-yellow-500"></div>;
  }

  return <div className="h-3 w-3 rounded-full bg-emerald-500"></div>;
}
