import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createBookSchema } from "../validators/book.validator";

import {
  createBook,
  getAllBooks,
} from "../services/book.service";

export const createBookController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = createBookSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const ownerId = req.user.id;

    const book = await createBook(
      result.data.title,
      result.data.author,
      result.data.price,
      result.data.description,
      result.data.categoryId,
      ownerId
    );

    return res.status(201).json({
      message: "Book created successfully",
      book,
    });
  }
);

export const getAllBooksController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;

    const books = await getAllBooks(user.role, user.id);

    return res.status(200).json({
      books,
    });
  }
);