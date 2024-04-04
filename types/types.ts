import { Server as NetServer, Socket } from "net";
import { Member, Server, User } from "@prisma/client";
import { NextApiResponse } from "next";
import { Server as SocketIoServer } from "socket.io";

export type ServerWithMembersWithUsers = Server & {
  members: (Member & { user: User })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer;
    };
  };
};
