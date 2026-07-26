import { Router } from "express";
import { Role } from "@prisma/client";

import {
  register,
  login,
  logout,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/auth.controller";

import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

// Temporary Test Route
router.get(
  "/admin-test",
  requireAuth,
  requireRole(Role.ADMIN),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

export default router;