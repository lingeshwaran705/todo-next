import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { todo } from "../../models/todo.model";

export default async function deleteTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const decoded: any = jwt.decode(req.body.token);
  const username = `${decoded.username}`;

  console.log(username);

  const response = await todo.findOneAndDelete({
    todo: req.body.todo,
    username: username,
  });

  console.log(response);
  res.json(response);
}
