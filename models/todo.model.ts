import mongoose from "mongoose";
import { model, models, Schema } from "mongoose";

type createType = {
  todo: string;
  userid: any;
};

const createSchema = new Schema<createType>(
  {
    todo: { type: String, required: true, unique: true, trim: true },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { collection: "Todos" }
);

export const todo = models.todos || model<createType>("todos", createSchema);
