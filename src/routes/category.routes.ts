import { Router } from "express";
import { Role } from "@prisma/client";

import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
} from "../controllers/category.controller";

const router = Router();

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

export default router;