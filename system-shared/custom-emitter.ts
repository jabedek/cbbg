import {
  SE_Direction,
  SE_SubjectAction,
  SocketEvent,
} from "./models/socket-events.model";
import { Socket as ServerSocket } from "../server-ts/node_modules/socket.io";
import { Socket as ClientSocket } from "../client/node_modules/socket.io-client";

export class CustomEmitter {
  source: SE_Direction;
  constructor(source: SE_Direction) {
    this.source = source;
  }

  emit<T = void>(
    socket: ServerSocket | ClientSocket,
    subjectAction: SE_SubjectAction,
    payload: T
  ) {
    socket.emit(
      `${this.source}#${subjectAction}`,
      new SocketEvent<T>(this.source, subjectAction, Date.now(), payload)
    );
  }
}
