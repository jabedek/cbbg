import {
  SE_Source,
  SE_Message,
  SocketEvent,
} from "./models/socket-events.model";
import { Socket as ServerSocket } from "../server-ts/node_modules/socket.io";
import { Socket as ClientSocket } from "../client/node_modules/socket.io-client";

export class CustomSocketEmitter {
  readonly direction: SE_Source;
  constructor(direction: SE_Source) {
    this.direction = direction;
  }

  emit<T = void>(
    socket: ServerSocket | ClientSocket,
    message: SE_Message,
    payload: T
  ) {
    socket.emit(
      `${this.direction}#${message}`,
      new SocketEvent<T>(this.direction, message, Date.now(), payload)
    );
  }
}
