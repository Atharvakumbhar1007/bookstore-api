import { Router } from "express";

import {
  register,
  login,
  logout,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/auth.controller";

import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

export default router;