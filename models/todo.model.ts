import { model, models, Schema } from "mongoose";

type createType = {
  todo: string;
  username: string;
};

const createSchema = new Schema<createType>(
  {
    todo: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: "Todos" }
);

export const todo = models.todos || model<createType>("todos", createSchema);
