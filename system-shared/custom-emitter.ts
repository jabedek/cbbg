import { S, M, SocketEvent } from "./models/socket-events.model";
import { Socket as ServerSocket } from "../server-ts/node_modules/socket.io";
import { Socket as ClientSocket } from "../client/node_modules/socket.io-client";

export class CustomSocketEmitter {
  readonly source: S;
  readonly socket: ServerSocket | ClientSocket;
  constructor(source: S, socket: ServerSocket | ClientSocket) {
    this.source = source;
    this.socket = socket;
  }

  emit<T = void>(message: M, payload: T) {
    this.socket.emit(
      `${this.source}#${message}`,
      new SocketEvent<T>(this.source, message, Date.now(), payload)
    );
  }
}
