"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (error, req, res, _next) => {
    const statusCode = error instanceof ApiError_1.ApiError
        ? error.statusCode
        : 500;
    const message = error instanceof ApiError_1.ApiError
        ? error.message
        : "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
