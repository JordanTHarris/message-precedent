import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// import { useSocket } from "#app/utils/context";
// import { getUserImgSrc } from "#app/utils/misc";

function ChatBar({ members }: { members: any }) {
  // const socket = useSocket();

  // useEffect(() => {
  // 	const handleNewUserResponse = (data: any) => {
  // 		setUsers(data);
  // 	};
  // 	socket?.on('newUserResponse', handleNewUserResponse);
  // 	return () => {
  // 		socket?.off('newUserResponse', handleNewUserResponse);
  // 	};
  // }, [socket]);

  // useEffect(() => {});

  return (
    <div className="w-[150px] border-r-2 border-input px-4 py-4">
      <div>
        <h3 className="">Users</h3>
        <Separator />
        <div className="p-2">
          {members.map((member: any) => {
            console.log(member.name);
            return (
              <div className="flex items-center gap-3 p-2" key={member.id}>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    // src={getUserImgSrc(user.image?.id)}
                    src="https://i.pravatar.cc/300"
                    alt="Avatar"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <p className="text-left text-base">{member.user.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ChatBar;
