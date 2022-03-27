import { NextApiRequest, NextApiResponse } from "next";
import { todo } from "../../../models/todo.model";

export default async function Todo(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { todoid } = req.query;
    const { updatedTodo } = req.body;

    try {
      await todo.findByIdAndUpdate(todoid, {
        $set: { todo: updatedTodo },
      });

      res.send("");
    } catch (err) {
      if (err) {
        res.json({ error: "Todo already exists" });
      }
    }
  }

  if (req.method === "DELETE") {
    const { todoid } = req.query;

    console.log(todoid);

    const response = await todo.findByIdAndDelete(todoid);

    console.log(response);
    res.json(response);
  }
}
