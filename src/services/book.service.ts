import prisma from "../config/prisma";
import { Role } from "@prisma/client";
import { ApiError } from "../utils/ApiError";

/* ===========================
   Create Book
=========================== */

export const createBook = async (
  title: string,
  author: string,
  price: number,
  description: string | undefined,
  categoryId: number,
  ownerId: number
) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const ownerSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
  } as const;

  const book = await prisma.book.create({
    data: {
      title,
      author,
      price,
      description,
      categoryId,
      ownerId,
    },
    include: {
      owner: { select: ownerSelect },
      category: true,
    },
  });

  return book;
};

/* ===========================
   Get All Books
=========================== */

export const getAllBooks = async (
  role: Role,
  userId: number
) => {
  const ownerSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
  } as const;

  if (role === Role.ADMIN) {
    return prisma.book.findMany({
      include: {
        owner: { select: ownerSelect },
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return prisma.book.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      owner: { select: ownerSelect },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

/* ===========================
   Get Book By ID
=========================== */

export const getBookById = async (
  id: number,
  role: Role,
  userId: number
) => {
  const ownerSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
  } as const;

  const book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      owner: { select: ownerSelect },
      category: true,
    },
  });

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (role !== Role.ADMIN && book.ownerId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  return book;
};

/* ===========================
   Update Book
=========================== */

export const updateBook = async (
  id: number,
  title: string,
  author: string,
  price: number,
  description: string | undefined,
  categoryId: number,
  role: Role,
  userId: number
) => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (role !== Role.ADMIN && book.ownerId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const ownerSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
  } as const;

  const updatedBook = await prisma.book.update({
    where: {
      id,
    },
    data: {
      title,
      author,
      price,
      description,
      categoryId,
    },
    include: {
      owner: { select: ownerSelect },
      category: true,
    },
  });

  return updatedBook;
};

/* ===========================
   Delete Book
=========================== */

export const deleteBook = async (
  id: number,
  role: Role,
  userId: number
) => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (role !== Role.ADMIN && book.ownerId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  await prisma.book.delete({
    where: {
      id,
    },
  });

  return {
    message: "Book deleted successfully",
  };
};

/* ===========================
   Get Books By Category
=========================== */

export const getBooksByCategory = async (
  categoryId: number,
  role: Role,
  userId: number
) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const ownerSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
  } as const;

  if (role === Role.ADMIN) {
    return prisma.book.findMany({
      where: {
        categoryId,
      },
      include: {
        owner: { select: ownerSelect },
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return prisma.book.findMany({
    where: {
      categoryId,
      ownerId: userId,
    },
    include: {
      owner: { select: ownerSelect },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};