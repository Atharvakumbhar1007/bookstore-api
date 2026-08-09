"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksByCategory = exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const client_1 = require("@prisma/client");
const ApiError_1 = require("../utils/ApiError");
/* ===========================
   Create Book
=========================== */
const createBook = async (title, author, price, description, categoryId, ownerId) => {
    const category = await prisma_1.default.category.findUnique({
        where: {
            id: categoryId,
        },
    });
    if (!category) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    const ownerSelect = {
        id: true,
        name: true,
        email: true,
        role: true,
    };
    const book = await prisma_1.default.book.create({
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
exports.createBook = createBook;
/* ===========================
   Get All Books
=========================== */
const getAllBooks = async (role, userId) => {
    const ownerSelect = {
        id: true,
        name: true,
        email: true,
        role: true,
    };
    if (role === client_1.Role.ADMIN) {
        return prisma_1.default.book.findMany({
            include: {
                owner: { select: ownerSelect },
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    return prisma_1.default.book.findMany({
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
exports.getAllBooks = getAllBooks;
/* ===========================
   Get Book By ID
=========================== */
const getBookById = async (id, role, userId) => {
    const ownerSelect = {
        id: true,
        name: true,
        email: true,
        role: true,
    };
    const book = await prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            owner: { select: ownerSelect },
            category: true,
        },
    });
    if (!book) {
        throw new ApiError_1.ApiError(404, "Book not found");
    }
    if (role !== client_1.Role.ADMIN && book.ownerId !== userId) {
        throw new ApiError_1.ApiError(403, "Access denied");
    }
    return book;
};
exports.getBookById = getBookById;
/* ===========================
   Update Book
=========================== */
const updateBook = async (id, title, author, price, description, categoryId, role, userId) => {
    const book = await prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!book) {
        throw new ApiError_1.ApiError(404, "Book not found");
    }
    if (role !== client_1.Role.ADMIN && book.ownerId !== userId) {
        throw new ApiError_1.ApiError(403, "Access denied");
    }
    const category = await prisma_1.default.category.findUnique({
        where: {
            id: categoryId,
        },
    });
    if (!category) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    const ownerSelect = {
        id: true,
        name: true,
        email: true,
        role: true,
    };
    const updatedBook = await prisma_1.default.book.update({
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
exports.updateBook = updateBook;
/* ===========================
   Delete Book
=========================== */
const deleteBook = async (id, role, userId) => {
    const book = await prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!book) {
        throw new ApiError_1.ApiError(404, "Book not found");
    }
    if (role !== client_1.Role.ADMIN && book.ownerId !== userId) {
        throw new ApiError_1.ApiError(403, "Access denied");
    }
    await prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return {
        message: "Book deleted successfully",
    };
};
exports.deleteBook = deleteBook;
/* ===========================
   Get Books By Category
=========================== */
const getBooksByCategory = async (categoryId, role, userId) => {
    const category = await prisma_1.default.category.findUnique({
        where: {
            id: categoryId,
        },
    });
    if (!category) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    const ownerSelect = {
        id: true,
        name: true,
        email: true,
        role: true,
    };
    if (role === client_1.Role.ADMIN) {
        return prisma_1.default.book.findMany({
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
    return prisma_1.default.book.findMany({
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
exports.getBooksByCategory = getBooksByCategory;
