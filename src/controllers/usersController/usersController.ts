import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userModel";
import { validationResult } from "express-validator";

export const httpGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.send(user);
  } catch {
    next();
  }
};

export const httpGetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageNumber = 1, pageSize = 10, role } = req.query;

    const currentPage = Number(pageNumber);
    const pageLimit = Number(pageSize);

    const skip = (currentPage - 1) * pageLimit;

    const sort: any = {};

    if (role) {
      sort.role = role === "admin" ? 1 : -1;
    }

    sort.createdAt = -1;

    const users = await User.find().limit(pageLimit).skip(skip).sort(sort);

    const totalItems = await User.countDocuments();

    const totalPages = Math.ceil(totalItems / pageLimit);

    return res.send({
      pageSize: pageLimit,
      pageNumber: currentPage,
      totalPages,
      totalItems,
      users,
    });
  } catch {
    next();
  }
};

export const httpAddUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ error: "Email already in use" });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array()[0].msg });
    }

    const user = await User.create({ email, password, name, role });

    return res.status(201).send({ message: "User added successfully", user });
  } catch {
    next();
  }
};

export const httpUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { email, password, name, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (email) user.email = email;
    if (password) user.password = password;
    if (name) user.name = name;
    if (role) user.role = role;

    const updatedUser = await user.save();

    return res.send({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch {
    next();
  }
};

export const httpDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const deletedUser = await user.deleteOne();

    return res.send({
      message: "Deleted user successfully",
      user: deletedUser,
    });
  } catch {
    next();
  }
};
