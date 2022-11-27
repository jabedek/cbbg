import { Server } from "socket.io";
import { IdGenerator } from "../../../system-shared/helpers/id-gen";
import { IOInstanceData } from "./socket-server-entity.model";

export function prepareIOInstance(http: any, origin: string[]): IOInstanceData {
  const entity: IOInstanceData = {
    id: IdGenerator.generateId("io"),
    ended: undefined,
    started: new Date(),
    ioInstance: new Server(http, {
      cors: {
        origin,
      },
    }),
  };

  return entity;
}
