"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.getCategoryByIdController = exports.getAllCategoriesController = exports.createCategoryController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const category_service_1 = require("../services/category.service");
const category_validator_1 = require("../validators/category.validator");
exports.createCategoryController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = category_validator_1.CategorySchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const category = await (0, category_service_1.createCategory)(result.data.name);
    return res.status(201).json({
        message: "Category created successfully",
        category,
    });
});
exports.getAllCategoriesController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const categories = await (0, category_service_1.getAllCategories)();
    return res.status(200).json({
        message: "Categories fetched successfully",
        categories,
    });
});
exports.getCategoryByIdController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new ApiError_1.ApiError(400, "Invalid category ID");
    }
    const category = await (0, category_service_1.getCategoryById)(id);
    return res.status(200).json({
        message: "Category fetched successfully",
        category,
    });
});
exports.updateCategoryController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new ApiError_1.ApiError(400, "Invalid category ID");
    }
    const result = category_validator_1.updateCategorySchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const updatedCategory = await (0, category_service_1.updateCategory)(id, result.data.name);
    return res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory,
    });
});
exports.deleteCategoryController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new ApiError_1.ApiError(400, "Invalid category ID");
    }
    const result = await (0, category_service_1.deleteCategory)(id);
    return res.status(200).json(result);
});
