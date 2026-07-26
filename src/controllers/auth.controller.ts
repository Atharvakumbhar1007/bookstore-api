import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../services/auth.service";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/auth.validator";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const { name, email, password } = result.data;

    const user = await registerUser(
      name,
      email,
      password
    );

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const { email, password } = result.data;

    const data = await loginUser(
      email,
      password
    );

    return res.status(200).json({
      message: "Login successful",
      ...data,
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response) => {
    return res.status(200).json({
      message:
        "Logout successful. Please discard the token on the client.",
    });
  }
);

export const forgotPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = forgotPasswordSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const data = await forgotPassword(result.data.email);

    return res.status(200).json(data);
  }
);

export const resetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = resetPasswordSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const token = req.params.token;

    if (typeof token !== "string") {
      throw new ApiError(400, "Invalid token");
    }

    const data = await resetPassword(
      token,
      result.data.password
    );

    return res.status(200).json(data);
  }
);