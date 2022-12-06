import { Server } from "socket.io";
import {
  SE_Source,
  SE_Message,
} from "../../../system-shared/models/socket-events.model";
import { RoomData } from "../../../system-shared/models/specific-events.model";

export function emitRoomsUpdate(ioInstance: Server): void {
  const rooms: RoomData[] = [...ioInstance.of("/").adapter.rooms]
    .filter((room) => room[0].includes("room"))
    .map((room) => {
      const connectedSockets: any[] = [];
      room[1].forEach((e) => connectedSockets.push(e));

      const [createdByUserId, _, name] = room[0]
        .replace("room:", "")
        .split("-");

      return {
        roomId: room[0],
        createdByUserId,
        name,
        connectedSockets,
      } as unknown as RoomData;
    });

  ioInstance.emit(`${SE_Source.SERVER}#${SE_Message.update_rooms}`, rooms);
}
