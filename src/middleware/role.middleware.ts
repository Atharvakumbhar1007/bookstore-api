import {
  Request,
  Response,
  NextFunction,
} from "express";

import { Role } from "@prisma/client";
import { ApiError } from "../utils/ApiError";

export const requireRole =
  (role: Role) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    next();
  };