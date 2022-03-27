import { model, models, Schema } from "mongoose";
import mongoose from "mongoose";

type user = {
  name: string;
  email: string;
  password: string;
};

const userSchema = new Schema<user>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "users",
  }
);

export const userModel = models.users || model<user>("users", userSchema);
