import { IOInstanceData } from "./socket-server-entity.model";
import logger from "node-color-log";
import { Server, Socket } from "socket.io";
import { IOEvent } from "../../../system-shared/models/io-events.model";
import {
  SE_Basic,
  SE_Source,
} from "../../../system-shared/models/socket-events.model";
import {
  UserData,
  UserSocketSessionData,
} from "../../../system-shared/models/user.model";
import { CustomSocketEmitter } from "../../../system-shared/custom-emitter";
import { emitRoomsUpdate } from "./socket-helpers";
import {
  listenToIOEngineEvents,
  listenToRoomBasicEvents,
  listenToRoomCustomEvents,
} from "./socket-listeners";
import { IdGenerator } from "../../../system-shared/helpers/id-gen";

// READ: https://socket.io/docs/v4/server-instance/

const usersData = new Map<string, UserSocketSessionData>();

export function setupSocketServer(http: any, origin: string[]): void {
  const { ioInstance, ...socketRest }: IOInstanceData = prepareIOInstance(
    http,
    origin
  );
  listenToIOEngineEvents(ioInstance);

  ioInstance.on(IOEvent.connection, (socket: Socket): void => {
    coupleSocketListenersToUser(socket, ioInstance);
  });
}

function coupleSocketListenersToUser(socket: Socket, ioInstance: Server) {
  const socketUserData: UserSocketSessionData = {
    createdRooms: [],
    userId: socket.handshake.query.userId as unknown as string,
    currentSocket: socket,
    atRoom: undefined,
  };

  const userId = socketUserData.userId;
  const previouslySet = userId ? usersData.get(userId) : false;

  if (previouslySet) {
    previouslySet.currentSocket = socket;
  } else if (userId) {
    usersData.get(userId)?.currentSocket?.removeAllListeners().disconnect();
    usersData.set(userId, socketUserData);

    const setUser = usersData.get(userId);
    const setUserSocket = setUser?.currentSocket as Socket;

    if (setUser && setUserSocket) {
      listenToRoomBasicEvents(ioInstance);
      listenToRoomCustomEvents(setUserSocket, ioInstance, usersData);
      const emitter = new CustomSocketEmitter(SE_Source.SERVER);

      setUserSocket.on(SE_Basic.disconnect, () => {
        usersData.get(userId)?.currentSocket?.removeAllListeners().disconnect();

        logger
          .dim()
          .italic()
          .color("green")
          .log("User disconnected", [...ioInstance.of("/").adapter.rooms]);
      });
    }
  }
  emitRoomsUpdate(ioInstance);

  logger.info(
    `Client socket [${socket.id}] has connected for user with id [${userId}].`,
    `Total: ${ioInstance.of("/").sockets.size}.`
  );
}

function prepareIOInstance(http: any, origin: string[]): IOInstanceData {
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
