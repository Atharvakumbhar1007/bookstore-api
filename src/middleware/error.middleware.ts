import {
    Request,
    Response,
    NextFunction,
} from "express";

import { ApiError } from "../utils/ApiError";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    error instanceof ApiError
      ? error.statusCode
      : 500;

  const message =
    error instanceof ApiError
      ? error.message
      : "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};