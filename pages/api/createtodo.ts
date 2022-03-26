import { todo } from "../../models/todo.model";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function createTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dcoded: any = jwt.decode(req.body.token);

    const response = await todo.create({
      todo: req.body.todo,
      username: `${dcoded.username}`,
    });

    console.log(response);

    res.send("created todo success fully");
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ error: "Todo already exists" });
  }
}
