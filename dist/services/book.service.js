"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
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
