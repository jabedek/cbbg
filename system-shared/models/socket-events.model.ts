// SE = SocketEvent

// Source
export enum S {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

// Basic Message
export enum B {
  ["connect"] = "connect",
  ["disconnect"] = "disconnect",
  ["create-room"] = "create-room",
  ["delete-room"] = "delete-room",
  ["join-room"] = "join-room",
  ["leave-room"] = "leave-room",
}

// Custom Message
export enum M {
  user_create_game = "user_create_game",
  user_create_game_response = "user_create_game_response",
  user_joined_game = "user_joined_game",
  send_active_games = "send_active_games",
  // game_started = "game_started",
  // game_finished = "game_finished",
  // game_paused = "game_paused",
  // general_client_connected = "general_client_connected",
}

export class SocketEvent<T> {
  source: S;
  message: M;
  timestamp: number;
  payload: T;
  constructor(source: S, message: M, timestamp: number, payload: T) {
    this.source = source;
    this.message = message;
    this.timestamp = timestamp;
    this.payload = payload;
  }
}
