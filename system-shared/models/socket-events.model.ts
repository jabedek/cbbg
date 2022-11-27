// SE = SocketEvent

export enum SE_Direction {
  FROM_CLIENT = "FROM_CLIENT",
  FROM_SERVER = "FROM_SERVER",
}

export enum SE_Basic {
  ["connect"] = "connect",
  ["disconnect"] = "disconnect",
  ["create-room"] = "create-room",
  ["delete-room"] = "delete-room",
  ["join-room"] = "join-room",
  ["leave-room"] = "leave-room",
}

export enum SE_SubjectAction {
  user_create_room = "user_create_room",
  user_joined_room = "user_joined_room",
  game_started = "game_started",
  game_finished = "game_finished",
  game_paused = "game_paused",
  general_client_connected = "general_client_connected",
  general_update_client = "general_update_client",
}
export enum SE_Result {
  user_create_room_success = "user_create_room_success",
}

export class SocketEvent<T> {
  source: SE_Direction;
  subjectAction: SE_SubjectAction;
  timestamp: number;
  payload: T;
  constructor(
    source: SE_Direction,
    subjectAction: SE_SubjectAction,
    timestamp: number,
    payload: T
  ) {
    this.source = source;
    this.subjectAction = subjectAction;
    this.timestamp = timestamp;
    this.payload = payload;
  }
}
