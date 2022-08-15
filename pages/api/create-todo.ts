import { todo } from "../../models/todo.model";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function createTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = JSON.parse(req.body);
    const dcoded: any = jwt.decode(data.token);

    const response = await todo.create({
      todo: data.todo,
      userid: `${dcoded.id}`,
    });

    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.json({ error: "Todo already exists" });
  }
}
