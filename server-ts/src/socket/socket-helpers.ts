import { Server } from "socket.io";
import {
  SE_Direction,
  SE_SubjectAction,
} from "../../../system-shared/models/socket-events.model";

export function emitRoomsUpdate(ioInstance: Server): void {
  ioInstance.of("/").sockets.forEach((s) => console.log(s.id));

  console.log("emitRoomsUpdate", ioInstance.of("/").adapter.rooms);

  ioInstance.emit(
    `${SE_Direction.FROM_SERVER}#${SE_SubjectAction.general_update_client}`,
    {
      rooms: [...ioInstance.of("/").adapter.rooms].filter(([name, data]) =>
        name.includes("room")
      ),
    }
  );
}
