import { Server } from "socket.io";

/** This method makes the matching Socket instances join the specified rooms. */
export function socketsJoin(
  ioInstance: Server,
  socketOrRoomId: string | null,
  targetRoomIds: string[],
  namespace?: string
) {
  if (socketOrRoomId === null) {
    // make all Socket instances join provided rooms
    ioInstance.socketsJoin(targetRoomIds);
  } else if (socketOrRoomId.includes("room")) {
    // make all Socket instances in the a room X join provided rooms
    ioInstance.in(socketOrRoomId).socketsJoin(targetRoomIds);
  } else {
    // make a single Socket join provided rooms
    ioInstance.in(socketOrRoomId).socketsJoin(targetRoomIds);
  }
}

/** This method makes the matching Socket instances leave the specified rooms. */
export function socketsLeave(
  ioInstance: Server,
  socketOrRoomId: string | null,
  targetRoomIds: string[],
  namespace?: string
) {
  if (socketOrRoomId === null) {
    // make all Socket instances join provided rooms
    ioInstance.socketsLeave(targetRoomIds);
  } else if (socketOrRoomId.includes("room")) {
    // make all Socket instances in the a room X join provided rooms
    ioInstance.in(socketOrRoomId).socketsLeave(targetRoomIds);
  } else {
    // make a single Socket join provided rooms
    ioInstance.in(socketOrRoomId).socketsLeave(targetRoomIds);
  }
}

/** This method makes the matching Socket instances disconnect. */
export function disconnectSockets(
  ioInstance: Server,
  socketOrRoomId: string | null,
  namespace?: string
) {
  if (socketOrRoomId === null) {
    // make all Socket instances join provided rooms
    ioInstance.disconnectSockets();
  } else if (socketOrRoomId.includes("room")) {
    // make all Socket instances in the a room X join provided rooms
    ioInstance.in(socketOrRoomId).disconnectSockets();
  } else {
    // make a single Socket join provided rooms
    ioInstance.in(socketOrRoomId).disconnectSockets();
  }
}

/** TThis method returns the matching Socket instances. */
export async function fetchSockets(
  ioInstance: Server,
  socketOrRoomId: string | null,
  namespace?: string
) {
  let sockets: unknown[];

  if (socketOrRoomId === null) {
    // return all Socket instances of the main namespace
    sockets = await ioInstance.fetchSockets();
  } else {
    // return all Socket instances in the provided room of the main namespace
    sockets = await ioInstance.in(socketOrRoomId).fetchSockets();

    // return all Socket instances in the provided room of the "admin" namespace
    // sockets = await ioInstance.of(namespace).in(socketOrRoomId).fetchSockets();

    // return single Socket
    sockets = await ioInstance.in(socketOrRoomId).fetchSockets();
  }
}
