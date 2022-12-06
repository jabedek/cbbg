export type UserHash = `user:${string}`;
export type RoomHash = `game:${string}-${string}`;

export interface Game {
  gameId: RoomHash;
  createdByUserId: string;
  name: string;
  connectedSockets: any[];
}
