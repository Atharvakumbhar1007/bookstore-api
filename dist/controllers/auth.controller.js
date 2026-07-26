"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = exports.logout = exports.login = exports.register = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const auth_service_1 = require("../category.service.ts/auth.service");
const auth_validator_1 = require("../validators/auth.validator");
const auth_validator_2 = require("../validators/auth.validator");
const auth_service_2 = require("../category.service.ts/auth.service");
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = auth_validator_1.registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const { name, email, password } = result.data;
    const user = await (0, auth_service_1.registerUser)(name, email, password);
    return res.status(201).json({
        message: "User registered successfully",
        user,
    });
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = auth_validator_1.loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const { email, password } = result.data;
    const data = await (0, auth_service_1.loginUser)(email, password);
    return res.status(200).json({
        message: "Login successful",
        ...data,
    });
});
exports.logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    return res.status(200).json({
        message: "Logout successful. Please discard the token on the client.",
    });
});
exports.forgotPasswordController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = auth_validator_2.forgotPasswordSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const data = await (0, auth_service_2.forgotPassword)(result.data.email);
    return res.json(data);
});
exports.resetPasswordController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = auth_validator_2.resetPasswordSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const token = req.params.token;
    if (!token || Array.isArray(token)) {
        throw new ApiError_1.ApiError(400, "Invalid token");
    }
    const data = await (0, auth_service_2.resetPassword)(token, result.data.password);
    return res.json(data);
});
