import mongoose from "mongoose";
import { UserData } from "../../../../system-shared/models/user.model";

export type NewUser = Omit<UserData, "_id">;

export const UserModel = mongoose.model(
  "User",
  new mongoose.Schema<NewUser>({
    username: String,
    password: String,
    gainedPoints: Number,
    joinedAt: String,
    currentConnection: {
      userSocketId: {
        type: String,
        value: undefined,
      },
      atRoom: {
        type: Object,
        value: undefined,
      },
    },
  })
);
