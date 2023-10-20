import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

export const httpLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).send({ error: errors.array()[0].msg });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: "Email does not exist" });
    }

    const isMatch = await (user as any).comparePassword(password);

    if (!isMatch) {
      return res.status(401).send({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    return res.send({
      user,
      message: "Logged in successfully",
      token,
    });
  } catch {
    next();
  }
};
