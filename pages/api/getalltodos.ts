import { NextApiRequest, NextApiResponse } from "next";
import { todo } from "../../models/todo.model";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function getTodos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const decoded: any = jwt.decode(req.body.token);

    if (decoded) {
      const username = `${decoded.username}`;

      console.log(username);

      const data = await todo.find({ username });

      res.json(data);
    }
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}
