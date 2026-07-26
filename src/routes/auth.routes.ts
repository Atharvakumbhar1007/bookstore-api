import { Router } from "express";
import { Role } from "@prisma/client";
import { updateCategorySchema } from "../validators/category.validator";

import {
  register,
  login,
  logout,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/auth.controller";

import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
} from "../controllers/category.controller";

import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

router.get(
    "/",
    requireAuth,
    getAllCategoriesController
);

router.get(
    "/:id",
    requireAuth,
    getCategoryByIdController
);

router.post(
    "/",
    requireAuth,
    requireRole(Role.ADMIN),
    createCategoryController
);

router.put(
    "/:id",
    requireAuth,
    requireRole(Role.ADMIN),
    updateCategoryController
);

export default router;