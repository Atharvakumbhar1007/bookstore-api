"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = exports.getProfileController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const user_service_1 = require("../services/user.service");
exports.getProfileController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await (0, user_service_1.getUserById)(req.user.id);
    return res.status(200).json({
        message: "Profile fetched successfully",
        user,
    });
});
exports.getAllUsersController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const users = await (0, user_service_1.getAllUsers)();
    return res.status(200).json({
        message: "Users fetched successfully",
        count: users.length,
        users,
    });
});
