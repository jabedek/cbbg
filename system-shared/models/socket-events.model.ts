// SE = SocketEvent

export enum SE_Source {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

export enum SE_Basic {
  ["connect"] = "connect",
  ["disconnect"] = "disconnect",
  ["create-room"] = "create-room",
  ["delete-room"] = "delete-room",
  ["join-room"] = "join-room",
  ["leave-room"] = "leave-room",
}

export enum SE_Message {
  user_create_room = "user_create_room",
  user_joined_room = "user_joined_room",
  game_started = "game_started",
  game_finished = "game_finished",
  game_paused = "game_paused",
  general_client_connected = "general_client_connected",
  update_rooms = "update_rooms",
}

export class SocketEvent<T> {
  direction: SE_Source;
  message: SE_Message;
  timestamp: number;
  payload: T;
  constructor(
    direction: SE_Source,
    message: SE_Message,
    timestamp: number,
    payload: T
  ) {
    this.direction = direction;
    this.message = message;
    this.timestamp = timestamp;
    this.payload = payload;
  }
}
