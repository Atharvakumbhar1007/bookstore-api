import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { ApiError } from "../utils/ApiError";

interface JwtPayload {
  id: number;
  role: Role;
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization Header
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new ApiError(
        401,
        "Authentication required"
      );
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Debug Logs
    console.log("======================================");
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("AUTH HEADER:", authHeader);
    console.log("TOKEN:", token);

    // Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    console.log("DECODED TOKEN:", decoded);

    // Attach User to Request
    (req as any).user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("JWT ERROR:", error);

    next(
      new ApiError(
        401,
        "Invalid or expired token"
      )
    );
  }
};