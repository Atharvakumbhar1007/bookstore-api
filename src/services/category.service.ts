import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";

export const createCategory = async (
  name: string
) => {
  const existingCategory =
    await prisma.category.findUnique({
      where: {
        name,
      },
    });

  if (existingCategory) {
    throw new ApiError(
      409,
      "Category already exists"
    );
  }

  const category =
    await prisma.category.create({
      data: {
        name,
      },
    });

  return category;
};

export const getAllCategories = async () => {
  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

  return categories;
};

export const getCategoryById = async (
  id: number
) => {
  const category =
    await prisma.category.findUnique({
      where: {
        id,
      },
    });

  if (!category) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  return category;
};