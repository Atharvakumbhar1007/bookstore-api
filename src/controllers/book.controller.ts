import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

import {
  createBook,
  getBookById,
  getAllBooks,
} from "../services/book.service";

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

export const getBookByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Invalid Book ID");
    }

    const book = await getBookById(
      id,
      req.user!.role,
      req.user!.id
    );

    return res.status(200).json({
      message: "Book fetched successfully",
      book,
    });
  }
);

export const getAllBooksController = asyncHandler(
  async (req: Request, res: Response) => {
    const books = await getAllBooks(
      req.user!.role,
      req.user!.id
    );

    return res.status(200).json({
      message: "Books fetched successfully",
      books,
    });
  }
);