import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { redirectToChat } from "@/lib/redirect";
import { redirectToLogin } from "@/lib/session";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

export default async function MemberIdPage({ params }: MemberIdPageProps) {
  const user = await currentUser();
  if (!user) return redirectToLogin();

  const currentMember = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!currentMember) {
    return redirectToChat();
  }

  const conversation = await getOrCreateConversation(
    currentMember?.id as string,
    params.memberId,
  );

  if (!conversation) {
    return redirectToChat(params.serverId);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.userId === user.id ? memberTwo : memberOne;

  return (
    <div className="flex h-full flex-col bg-chat">
      <ChatHeader
        imageUrl={otherMember.user.image as string}
        name={otherMember.user.name as string}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  );
}
