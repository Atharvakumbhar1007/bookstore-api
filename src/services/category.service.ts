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


export const updateCategory = async (
    id: number,
    name: string
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

    const existingCategory =
        await prisma.category.findUnique({
            where: {
                name,
            },
        });

    if (
        existingCategory &&
        existingCategory.id !== id
    ) {
        throw new ApiError(
            409,
            "Category name already exists"
        );
    }

    const updatedCategory =
        await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });

    return updatedCategory;
};

export const deleteCategory = async (
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

    const booksCount =
        await prisma.book.count({

            where: {

                categoryId: id,

            },

        });

    if (booksCount > 0) {

        throw new ApiError(

            409,

            "Cannot delete category because books are assigned to it"

        );

    }

    await prisma.category.delete({

        where: {

            id,

        },

    });

    return {

        message:

            "Category deleted successfully",

    };

};