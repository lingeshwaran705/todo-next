import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { todo as td } from "../../models/todo.model";

export default async function updateTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, updatedTodo } = req.body;

  console.log(req.body);

  const response = await td.findByIdAndUpdate(
    id,
    { $set: { todo: updatedTodo } },
    { new: true }
  );
  console.log(response);
  res.send("ok");
}
