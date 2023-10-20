import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization;

  const token = bearerHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Invalid token" });
    } else if (decoded) {
      (req as any).user = decoded;
      next();
    }
  });
};
