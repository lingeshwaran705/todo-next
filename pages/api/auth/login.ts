import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../../models/user.model";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  console.log(req.body);

  if (!username || !password) {
    res.json({ error: "Fill all the field" });
    return;
  }

  const user: any = await userModel.find({ name: username });

  if (user.length === 0) {
    res.json({ error: "User not found" });
    return;
  }

  const isCorrectPass = await bcrypt.compare(password, user[0].password);

  if (!isCorrectPass) {
    res.json({ error: "Invalid Credentials" });
  }

  try {
    const token = jwt.sign({ id: user._id }, `${process.env.SECRET_KEY}`);

    res.json({ token });
  } catch (err) {
    if (err) {
      console.log(err);
      res.json({ error: "Something went wrong" });
    }
  }
}
