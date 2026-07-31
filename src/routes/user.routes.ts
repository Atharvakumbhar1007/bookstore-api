import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { getProfileController } from "../controllers/user.controller";

const router = Router();

router.get("/profile", requireAuth, getProfileController);

export default router;