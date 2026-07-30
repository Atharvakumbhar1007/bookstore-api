"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.getAllBooks = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const client_1 = require("@prisma/client");
const getAllBooks = async (role, userId) => {
    if (role === client_1.Role.ADMIN) {
        return await prisma_1.default.book.findMany({
            include: {
                owner: true,
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    return await prisma_1.default.book.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            owner: true,
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllBooks = getAllBooks;
const createBook = async (title, author, price, description, categoryId, ownerId) => {
    const category = await prisma_1.default.category.findUnique({
        where: {
            id: categoryId
        }
    });
    if (!category) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    const book = await prisma_1.default.book.create({
        data: {
            title,
            author,
            price,
            description,
            ownerId,
            categoryId,
        },
        include: {
            owner: true,
            category: true,
        },
    });
    return book;
};
exports.createBook = createBook;
