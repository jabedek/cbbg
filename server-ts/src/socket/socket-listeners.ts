import logger from "node-color-log";
import { Server, Socket } from "socket.io";
import {
  IOEngineEvent,
  IOEngineErrorCode,
} from "../../../system-shared/models/io-events.model";
import {
  SE_Basic,
  SE_Direction,
  SE_SubjectAction,
  SocketEvent,
} from "../../../system-shared/models/socket-events.model";
import { RoomOpen } from "../../../system-shared/models/specific-events.model";
import { UserData } from "../../../system-shared/models/user.model";
import { emitRoomsUpdate } from "./socket-helpers";

/** Listen to io engine events provided by library */
export function listenToIOEngineEvents(ioInstance: Server): void {
  ioInstance.engine.on(IOEngineEvent.connection_error, (err: any) => {
    logger.error(err.req); // the request object
    logger.error(err.context); // some additional error context
    logger.error(`[${err.code}]`, IOEngineErrorCode[err.code]);
  });
}

/** Listen to room events provided by socket.io library */
export function listenToRoomBasicEvents(ioInstance: Server): void {
  ioInstance.of("/").adapter.on(SE_Basic["create-room"], (room) => {
    logger.fontColorLog("magenta", `[ROOM] room ${room} was created.`);
  });

  ioInstance.of("/").adapter.on(SE_Basic["delete-room"], (room) => {
    logger.fontColorLog("yellow", `[ROOM] room ${room} was deleted.`);
  });

  ioInstance.of("/").adapter.on(SE_Basic["join-room"], (room, id) => {
    logger.fontColorLog(
      "magenta",
      `[ROOM] sock ${id} has joined room ${room}.`
    );
  });

  ioInstance.of("/").adapter.on(SE_Basic["leave-room"], (room, id) => {
    logger.fontColorLog("yellow", `[ROOM] sock ${id} has left room ${room}.`);
  });
}

/** Listen to custom room events */
export function listenToRoomCustomEvents(
  socket: Socket,
  ioInstance: Server,
  usersData: Map<string, UserData>
): void {
  console.log("listenToRoomCustomEvents");

  socket.on(
    `${SE_Direction.FROM_CLIENT}#${SE_SubjectAction.user_create_room}`,
    async (event: SocketEvent<RoomOpen>) => {
      console.log(event);

      const { roomId, socketUserId } = event.payload;
      socket.join(roomId);

      const user = usersData.get(socketUserId);

      if (user) {
        user.createdRooms.push(roomId);
      }

      emitRoomsUpdate(ioInstance);
    }
  );
}