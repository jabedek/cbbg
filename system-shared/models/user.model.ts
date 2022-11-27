import { Socket as ServerSocket } from "../../server-ts/node_modules/socket.io";
import { Socket as ClientSocket } from "../../client/node_modules/socket.io-client";

export type UserData = {
  joinedAt: Date;
  socketUserId: string;
  currentSocket: ServerSocket | ClientSocket | undefined;
  createdRooms: string[];
};
