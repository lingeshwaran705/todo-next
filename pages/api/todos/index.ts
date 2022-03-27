import { NextApiRequest, NextApiResponse } from "next";
import { todo } from "../../../models/todo.model";

export default async function getTodos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await todo.find({});

    res.json(data);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}
