import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";


export const logout = asyncHandler(
  async (req: Request, res: Response) => {
    return res.json({
      message: "Logout successful. Please discard the token on the client.",
    });
  }
);
