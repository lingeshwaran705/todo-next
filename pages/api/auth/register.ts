import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../../models/user.model";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = JSON.parse(req.body);

  console.log(username);

  if (!username || !password) {
    res.statusCode = 500;
    res.json({ error: "Fill all the field" });
    return;
  }

  try {
    const token = jwt.sign({ username }, `${process.env.MONGO_URI}`);

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPass,
      date: new Date(),
    });

    const d = new Date();
    res.json({ token });
  } catch (err) {
    if (err) {
      res.json({ error: "Username already exists" });
    }
  }
}
