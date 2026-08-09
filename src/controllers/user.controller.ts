import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { getUserById, getAllUsers } from "../services/user.service";

export const getProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getUserById((req as any).user.id);

    return res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  }
);

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await getAllUsers();

    return res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  }
);