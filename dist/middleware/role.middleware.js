"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const ApiError_1 = require("../utils/ApiError");
const requireRole = (role) => (req, res, next) => {
    if (req.user?.role !== role) {
        throw new ApiError_1.ApiError(403, "Access denied");
    }
    next();
};
exports.requireRole = requireRole;
