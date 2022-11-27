import { IOInstanceData } from "./socket-server-entity.model";
import logger from "node-color-log";
import { Server, Socket } from "socket.io";
import { IOEvent } from "../../../system-shared/models/io-events.model";
import {
  SE_Basic,
  SE_Direction,
} from "../../../system-shared/models/socket-events.model";
import { UserData } from "../../../system-shared/models/user.model";
import { CustomEmitter } from "../../../system-shared/custom-emitter";
import { prepareIOInstance } from "./prepare";
import { emitRoomsUpdate } from "./socket-helpers";
import {
  listenToIOEngineEvents,
  listenToRoomBasicEvents,
  listenToRoomCustomEvents,
} from "./socket-listeners";

// READ: https://socket.io/docs/v4/server-instance/

const usersData = new Map<string, UserData>();

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
  const socketUserData: UserData = {
    socketUserId: socket.handshake.query.socketUserId as unknown as string,
    joinedAt: new Date(),
    createdRooms: [],
    currentSocket: socket,
  };

  const previouslySet = usersData.get(socketUserData.socketUserId);

  if (previouslySet) {
    previouslySet.currentSocket = socket;
  } else {
    usersData
      .get(socketUserData.socketUserId)
      ?.currentSocket?.removeAllListeners()
      .disconnect();

    usersData.set(socketUserData.socketUserId, socketUserData);
    const setUser = usersData.get(socketUserData.socketUserId);
    const setUserSocket = setUser?.currentSocket as Socket;

    if (setUser && setUserSocket) {
      listenToRoomBasicEvents(ioInstance);
      listenToRoomCustomEvents(setUserSocket, ioInstance, usersData);
      emitRoomsUpdate(ioInstance);

      const emitter = new CustomEmitter(SE_Direction.FROM_SERVER);

      setUserSocket.on(SE_Basic.disconnect, () => {
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
    `Client socket [${socket.id}] has connected for user with id [${socketUserData.socketUserId}].`,
    `Total: ${ioInstance.of("/").sockets.size}.`
  );
  // console.log("Current socketid", socket.id);
  // console.log(
  //   usersData.get(socketUserData.socketUserId)?.socketUserId,
  //   usersData.get(socketUserData.socketUserId)?.currentSocket?.id
  // );
}
