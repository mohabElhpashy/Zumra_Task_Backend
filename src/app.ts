import express from "express";
import cors from "cors";
import { usersRouter } from "./routers/usersRouter";
import { authRouter } from "./routers/authRouter";
import { errorHandler } from "./middlewares/errorHandler";
import { verifyToken } from "./middlewares/verifyToken";

export const app = express();

app.use(express.json());
app.use(
  cors({
    allowedHeaders: "*",
  })
);

app.use("/api/auth", authRouter);
app.use("/api/users", verifyToken, usersRouter);

app.use(errorHandler);
