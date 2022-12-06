import logger from "node-color-log";
import { Server, Socket } from "socket.io";
import {
  IOEngineEvent,
  IOEngineErrorCode,
} from "../../../system-shared/models/io-events.model";
import {
  SE_Basic,
  SE_Source,
  SE_Message,
  SocketEvent,
} from "../../../system-shared/models/socket-events.model";
import { Game } from "../../../system-shared/models/specific-events.model";
import {
  UserData,
  UserSocketSessionData,
} from "../../../system-shared/models/user.model";
import { sendActiveGames } from "./socket-helpers";

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

export function listenToCreateGame(
  socket: Socket,
  ioInstance: Server,
  usersData: Map<string, UserSocketSessionData>
): void {
  console.log("listenToCreateGame");

  socket.on(
    `${SE_Source.CLIENT}#${SE_Message.user_create_game}`,
    async (event: SocketEvent<Game>) => {
      console.log(">>", event);

      const { gameId, createdByUserId, name, connectedSockets } = event.payload;
      socket.join(gameId);

      const user = usersData.get(createdByUserId);
      if (user) {
        user?.createdGames?.push(gameId);
      }

      ioInstance.emit(
        `${SE_Source.SERVER}#${SE_Message.user_create_game_response}`,
        "created"
      );

      sendActiveGames(ioInstance);
    }
  );
}
