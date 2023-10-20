import jwt from "jsonwebtoken";

export const generateTestToken = (userId: string) => {
  const payload = {
    userId: userId,
  };
  const secret = process.env.JWT_SECRET!;

  return jwt.sign(payload, secret);
};
