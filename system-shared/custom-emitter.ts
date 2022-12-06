import {
  SE_Source,
  SE_Message,
  SocketEvent,
} from "./models/socket-events.model";
import { Socket as ServerSocket } from "../server-ts/node_modules/socket.io";
import { Socket as ClientSocket } from "../client/node_modules/socket.io-client";

export class CustomSocketEmitter {
  readonly source: SE_Source;
  constructor(source: SE_Source) {
    this.source = source;
  }

  emit<T = void>(
    socket: ServerSocket | ClientSocket,
    message: SE_Message,
    payload: T
  ) {
    socket.emit(
      `${this.source}#${message}`,
      new SocketEvent<T>(this.source, message, Date.now(), payload)
    );
  }
}
