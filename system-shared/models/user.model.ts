import { Socket as ServerSocket } from "../../server-ts/node_modules/socket.io";
import { Socket as ClientSocket } from "../../client/node_modules/socket.io-client";
import { ObjectId } from "../../server-ts/node_modules/mongodb";
import { GameHash } from "./specific-events.model";

export interface UserData {
  _id: ObjectId;
  username: string;
  password?: string;
  gainedPoints: number;
  joinedAt: string | number; // timestamp
  accessToken?: string;
}

interface UserSocketSession {
  userId?: string;
  createdGames?: GameHash[];
  atGameId?: GameHash;
}

export type UserSocketSessionDataWithSocket = UserSocketSession & {
  currentSocket?: ServerSocket | ClientSocket;
};
export type UserSocketSessionDataWithSocketID = UserSocketSession & {
  currentSocketId?: string;
};

export type UsersDataMap = Map<string, UserSocketSessionDataWithSocket>;
