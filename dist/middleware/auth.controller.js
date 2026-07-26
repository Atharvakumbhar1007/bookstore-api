"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
exports.logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    return res.json({
        message: "Logout successful. Please discard the token on the client.",
    });
});
