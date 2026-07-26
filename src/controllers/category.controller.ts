import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from "../services/category.service";

import { CategorySchema } from "../validators/category.validator";

export const createCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = CategorySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const category = await createCategory(
      result.data.name
    );

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  }
);

export const getAllCategoriesController = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await getAllCategories();

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  }
);

export const getCategoryByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const category = await getCategoryById(id);

    return res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  }
);