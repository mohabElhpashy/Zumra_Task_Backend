import { check } from "express-validator";
import { emailRegex, passwordRegex } from "../constants/validations";

export const validateUser = [
  check("email", "Email is not valid")
    .matches(emailRegex)
    .notEmpty()
    .withMessage("Email is required"),
  check("name", "Name is required").notEmpty(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(passwordRegex)
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  check("role", "Role must be either admin or user").custom((value) => {
    if (value !== "admin" && value !== "user") {
      throw new Error("Role must be either admin or user");
    }
    return true;
  }),
];

export const validateLogin = [
  check("email", "Invalid email")
    .matches(emailRegex)
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(passwordRegex)
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];
