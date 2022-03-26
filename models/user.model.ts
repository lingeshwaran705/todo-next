import { model, models, Schema } from "mongoose";
import mongoose from "mongoose";

type user = {
  username: string;
  password: string;
  date: Date;
};

const userSchema = new Schema<user>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date },
  },
  {
    collection: "users",
  }
);

export const userModel = models.users || model<user>("users", userSchema);
