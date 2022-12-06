import { Socket as ServerSocket } from "../../server-ts/node_modules/socket.io";
import { Socket as ClientSocket } from "../../client/node_modules/socket.io-client";
import { ObjectId } from "../../server-ts/node_modules/mongodb";
import { RoomHash } from "./specific-events.model";

export interface JoinedSocket {
  id: string;
  connected: boolean;
}

export interface UserData {
  _id: ObjectId;
  username: string;
  password: string;
  gainedPoints: number;
  joinedAt: string | number; // timestamp
  userId?: string;
}

export type UserDataWithToken = Omit<UserData, "password"> & {
  accessToken: string;
};

export interface UserSocketSessionData {
  userId?: string;
  currentSocket?: ServerSocket | ClientSocket;
  createdGames?: RoomHash[];
  atRoom?: ServerSocket | ClientSocket | undefined;
}
