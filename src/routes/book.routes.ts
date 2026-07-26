import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware";
import { createBookController } from "../controllers/book.controller";

const router = Router();

router.post(
  "/",
  requireAuth,
  createBookController
);

export default router;