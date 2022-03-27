import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../../models/user.model";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password, email } = req.body;
  console.log(req.body);
  if (!username || !password || !email) {
    res.statusCode = 500;
    res.json({ error: "Fill all the field" });
    return;
  }

  try {
    const hashedPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name: username,
      email: email,
      password: hashedPass,
    });

    const token = jwt.sign({ id: user._id }, `${process.env.MONGO_URI}`);

    console.log(user);

    res.json({ token });
  } catch (err) {
    if (err) {
      console.log(err);
      res.json({ error: "User already exists" });
    }
  }
}
