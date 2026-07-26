"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const token_1 = require("../utils/token");
const ApiError_1 = require("../utils/ApiError");
const registerUser = async (name, email, password) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        throw new ApiError_1.ApiError(409, "Email already exists");
    }
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError_1.ApiError(401, "Invalid email or password");
    }
    const isPasswordCorrect = await (0, hash_1.comparePassword)(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError_1.ApiError(401, "Invalid email or password");
    }
    const token = (0, jwt_1.generateToken)(user.id, user.role);
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
exports.loginUser = loginUser;
const forgotPassword = async (email) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return {
            message: "If an account exists, a reset token has been generated.",
        };
    }
    const token = (0, token_1.generateResetToken)();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);
    await prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            resetToken: token,
            resetTokenExpiry: expiry,
        },
    });
    return {
        message: "Reset token generated.",
        token,
        expiresAt: expiry,
    };
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (token, password) => {
    const user = await prisma_1.default.user.findFirst({
        where: {
            resetToken: token,
        },
    });
    if (!user) {
        throw new ApiError_1.ApiError(400, "Invalid token");
    }
    if (!user.resetTokenExpiry ||
        user.resetTokenExpiry < new Date()) {
        throw new ApiError_1.ApiError(400, "Token expired");
    }
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    await prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
        },
    });
    return {
        message: "Password updated successfully",
    };
};
exports.resetPassword = resetPassword;
