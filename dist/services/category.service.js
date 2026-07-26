"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
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
