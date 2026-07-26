import { Router } from "express";
import { Role } from "@prisma/client";
import { deleteCategoryController } from "../controllers/category.controller";
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

router.delete(

"/:id",

requireAuth,

requireRole(Role.ADMIN),

deleteCategoryController

);

export default router;