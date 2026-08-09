import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware";

import {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
} from "../controllers/book.controller";

const router = Router();

router.post("/", requireAuth, createBookController);
router.get("/", requireAuth, getAllBooksController);
router.get("/:id", requireAuth, getBookByIdController);
router.put("/:id", requireAuth, updateBookController);
router.delete("/:id", requireAuth, deleteBookController);

export default router;