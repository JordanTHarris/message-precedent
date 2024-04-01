import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
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
    <div className="bg-chat flex h-full flex-col">
      <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />
    </div>
  );
}
