import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service";

import {
  CategorySchema,
  updateCategorySchema,
} from "../validators/category.validator";

export const createCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = CategorySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const category = await createCategory(result.data.name);

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

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Invalid category ID");
    }

    const category = await getCategoryById(id);

    return res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  }
);

export const updateCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Invalid category ID");
    }

    const result = updateCategorySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const updatedCategory = await updateCategory(
      id,
      result.data.name
    );

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  }
);

export const deleteCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Invalid category ID");
    }

    const result = await deleteCategory(id);

    return res.status(200).json(result);
  }
);