"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = require("../utils/ApiError");
const createCategory = async (name) => {
    const existingCategory = await prisma_1.default.category.findUnique({
        where: {
            name,
        },
    });
    if (existingCategory) {
        throw new ApiError_1.ApiError(409, "Category already exists");
    }
    const category = await prisma_1.default.category.create({
        data: {
            name,
        },
    });
    return category;
};
exports.createCategory = createCategory;
const getAllCategories = async () => {
    const categories = await prisma_1.default.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
    return categories;
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (id) => {
    const category = await prisma_1.default.category.findUnique({
        where: {
            id,
        },
    });
    if (!category) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    return category;
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (id, name) => {
    const category = await prisma_1.default.category.findUnique({
        where: {
            id,
        },
    });
    if (!category) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    const existingCategory = await prisma_1.default.category.findUnique({
        where: {
            name,
        },
    });
    if (existingCategory &&
        existingCategory.id !== id) {
        throw new ApiError_1.ApiError(409, "Category name already exists");
    }
    const updatedCategory = await prisma_1.default.category.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
    return updatedCategory;
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    const category = await prisma_1.default.category.findUnique({
        where: {
            id,
        },
    });
    if (!category) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    const booksCount = await prisma_1.default.book.count({
        where: {
            categoryId: id,
        },
    });
    if (booksCount > 0) {
        throw new ApiError_1.ApiError(409, "Cannot delete category because books are assigned to it");
    }
    await prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return {
        message: "Category deleted successfully",
    };
};
exports.deleteCategory = deleteCategory;
