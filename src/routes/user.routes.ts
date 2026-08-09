import { Router } from "express";
import { Role } from "@prisma/client";

import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import {
  getProfileController,
  getAllUsersController,
} from "../controllers/user.controller";

const router = Router();

router.get("/profile", requireAuth, getProfileController);
router.get("/", requireAuth, requireRole(Role.ADMIN), getAllUsersController);

export default router;