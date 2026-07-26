import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

import { createBook } from "../services/book.service";

import { BookSchema } from "../validators/book.validator";

export const createBookController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = BookSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const {
      title,
      author,
      description,
      price,
      stock,
      categoryId,
    } = result.data;

    const book = await createBook(
      title,
      author,
      description,
      price,
      stock,
      categoryId
    );

    return res.status(201).json({
      message: "Book created successfully",
      book,
    });
  }
);