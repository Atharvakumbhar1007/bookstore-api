"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileController = exports.createCategoryController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const category_validator_1 = require("../validators/category.validator");
const category_service_1 = require("../services/category.service");
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
exports.getProfileController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    return res.status(200).json({
        message: "Profile fetched successfully",
        user: req.user,
    });
});
