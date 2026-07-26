import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (
  id: number,
  role: string
) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"],
  };

  return jwt.sign(
    {
      id,
      role,
    },
    secret,
    options
  );
};