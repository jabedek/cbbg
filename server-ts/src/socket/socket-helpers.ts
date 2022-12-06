import { Server } from "socket.io";
import {
  SE_Source,
  SE_Message,
} from "../../../system-shared/models/socket-events.model";
import { Game } from "../../../system-shared/models/specific-events.model";

export function sendActiveGames(
  ioInstance: Server,
  message?: SE_Message
): void {
  const rooms: Game[] = [...ioInstance.of("/").adapter.rooms]
    .filter((room) => room[0].includes("game"))
    .map((room) => {
      const connectedSockets: any[] = [];
      room[1].forEach((e) => connectedSockets.push(e));

      const [createdByUserId, _, name, nameHash] = room[0]
        .replace("game:", "")
        .split("-");

      return {
        gameId: room[0],
        createdByUserId,
        name: `${name}-${nameHash}`,
        connectedSockets,
      } as unknown as Game;
    });

  ioInstance.emit(
    `${SE_Source.SERVER}#${message || SE_Message.send_active_games}`,
    rooms
  );
}
