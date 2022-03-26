import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../../models/user.model";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = JSON.parse(req.body);

  if (!username || !password) {
    res.statusCode = 500;
    res.json({ error: "Fill all the field" });
    return;
  }

  const user: any = await userModel.find({ username });

  if (user.length === 0) {
    res.statusCode = 500;
    res.json({ error: "User not found" });
    return;
  }

  const isCorrectPass = await bcrypt.compare(password, user[0].password);

  if (!isCorrectPass) {
    res.json({ error: "Invalid Credentials" });
  }

  try {
    const token = jwt.sign({ username }, `${process.env.MONGO_URI}`);

    res.json({ token });
  } catch (err) {
    if (err) {
      res.json({ error: "Something went wrong" });
    }
  }
}
