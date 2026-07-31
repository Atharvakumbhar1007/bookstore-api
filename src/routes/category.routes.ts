import { Router } from "express";
import { Role } from "@prisma/client";
import { deleteCategoryController } from "../controllers/category.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import {getBooksByCategoryController} from "../controllers/book.controller";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
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

router.get(
"/:id/books",
requireAuth,
getBooksByCategoryController
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

router.delete(
"/:id",
requireAuth,
requireRole(Role.ADMIN),
deleteCategoryController
);
export default router;