"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // Check Authorization Header
        if (!authHeader ||
            !authHeader.startsWith("Bearer ")) {
            throw new ApiError_1.ApiError(401, "Authentication required");
        }
        // Extract Token
        const token = authHeader.split(" ")[1];
        // Debug Logs
        console.log("======================================");
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        console.log("AUTH HEADER:", authHeader);
        console.log("TOKEN:", token);
        // Verify Token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("DECODED TOKEN:", decoded);
        // Attach User to Request
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        console.error("JWT ERROR:", error);
        next(new ApiError_1.ApiError(401, "Invalid or expired token"));
    }
};
exports.requireAuth = requireAuth;
