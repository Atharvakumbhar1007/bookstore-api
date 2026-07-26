"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryByIdController = exports.getAllCategoriesController = exports.createCategoryController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
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
    const category = await (0, category_service_1.getCategoryById)(id);
    return res.status(200).json({
        message: "Category fetched successfully",
        category,
    });
});
