import { Server } from "socket.io";
import {
  Game,
  RoomHash,
} from "../../../../system-shared/models/specific-events.model";

export function findAndParseRoomsToGameObjects(
  ioInstance: Server,
  gameId?: RoomHash
): Game[] {
  const rooms: Game[] = [...ioInstance.of("/").adapter.rooms]
    .filter((room) => {
      if (room[0].includes("game")) {
        if (gameId && room[0] === gameId) {
          return room;
        } else {
          return room;
        }
      }
    })
    .map((room) => {
      const connectedSockets: any[] = [];
      room[1].forEach((e) => connectedSockets.push(e));

      const [createdByUserId, name, nameHash] = room[0]
        .replace("game:", "")
        .split("-");

      return {
        gameId: room[0],
        createdByUserId,
        name: `${name}-${nameHash}`,
        connectedSockets,
      } as unknown as Game;
    });
  return rooms;
}
