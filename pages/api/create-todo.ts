import { todo } from "../../models/todo.model";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function createTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dcoded: any = jwt.decode(req.body.token);

    console.log(req.body.token);
    console.log(dcoded);

    const response = await todo.create({
      todo: req.body.todo,
      userid: `${dcoded.id}`,
    });

    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.json({ error: "Todo already exists" });
  }
}
