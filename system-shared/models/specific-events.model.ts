export type UserHash = `user:${string}`;
export type RoomHash = `room:${string}-${number}-${string}`;

export interface RoomOpen {
  roomId: RoomHash;
  createdByUserId: string;
  name: string;
}
export type RoomData = RoomOpen & { connectedSockets: any[] };
