import { Router } from "express";
import {
  httpAddUser,
  httpDeleteUser,
  httpGetUser,
  httpGetUsers,
  httpUpdateUser,
} from "../controllers/usersController/usersController";
import { validateUser } from "../middlewares/validations";

export const usersRouter = Router();

usersRouter.get("/:id", httpGetUser);
usersRouter.get("/", httpGetUsers);
usersRouter.post("/", validateUser, httpAddUser);
usersRouter.put("/:id", httpUpdateUser);
usersRouter.delete("/:id", httpDeleteUser);
