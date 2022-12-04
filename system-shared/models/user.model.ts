import { Socket as ServerSocket } from "../../server-ts/node_modules/socket.io";
import { Socket as ClientSocket } from "../../client/node_modules/socket.io-client";
import { ObjectId } from "../../server-ts/node_modules/mongodb";

export type JoinedSocket = {
  id: string;
  connected: boolean;
};

export type UserData = {
  _id: ObjectId;
  username: string;
  password: string;
  gainedPoints: number;
  joinedAt: string; // timestamp
  currentConnection: {
    userSocketId?: string;
    atRoom?: ServerSocket | ClientSocket;
  };
};
