import { Request, Response } from "express";

export const errorHandler = (req: Request, res: Response) => {
  return res.status(500).send({ error: "Internal Server Error" });
};
