export type UserHash = `user:${string}`;
export type GameHash = `game:${string}-${string}`;

export interface Game {
  gameId: GameHash;
  createdByUserId: string;
  name: string;
  connectedSockets: any[];
}
