import { Server } from "socket.io";

export type IOInstanceData = {
  started: Date;
  ended: Date | undefined;
  id: string;
  ioInstance: Server;
};
