import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirectToLogin } from "@/lib/session";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
  const user = await currentUser();
  if (!user) return redirectToLogin();

  const channel = await prisma.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: user.id,
    },
  });

  if (!channel || !member) {
    return redirect(`/servers/${params.serverId}`);
  }

  return (
    <div className="flex h-full flex-col bg-chat">
      <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />
      <div className="flex-1">Future Messages</div>
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl={"/api/socket/messages/"}
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  );
}
