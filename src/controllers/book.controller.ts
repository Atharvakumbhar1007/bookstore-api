import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

import {
  createBook,
  getBookById,
  getAllBooks,
  deleteBook,
  getBooksByCategory,
  updateBook,
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
  categoryId,
} = result.data;

    const ownerId = (req as any).user.id;

    const book = await createBook(
      title,
      author,
      price,
      description,
      categoryId,
      ownerId
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
      (req as any).user.role,
      (req as any).user.id
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
      (req as any).user.role,
      (req as any).user.id
    );

    return res.status(200).json({
      message: "Books fetched successfully",
      books,
    });
  }
);

export const getBooksByCategoryController =

asyncHandler(

async (

req: Request,

res: Response

) => {

const categoryId = Number(req.params.id);

if (Number.isNaN(categoryId)) {

throw new ApiError(

400,

"Invalid Category ID"

);

}

const books = await getBooksByCategory(
    categoryId,
    (req as any).user.role,
    (req as any).user.id
);

return res.status(200).json({

message:

"Books fetched successfully",

count: books.length,

books,

});

});

export const updateBookController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Invalid Book ID");
    }

    const result = BookSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const {
      title,
      author,
      price,
      description,
      categoryId,
    } = result.data;

    const book = await updateBook(
      id,
      title,
      author,
      price,
      description,
      categoryId,
      (req as any).user.role,
      (req as any).user.id
    );

    return res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  }
);


export const deleteBookController = asyncHandler(
async (
req: Request,
res: Response
) => {
const id = Number(req.params.id);
if (Number.isNaN(id)) {
throw new ApiError(
400,
"Invalid Book ID"
);
}
const result =
await deleteBook(
    id,
    (req as any).user.role,
    (req as any).user.id
);
return res.status(200).json(result);
});