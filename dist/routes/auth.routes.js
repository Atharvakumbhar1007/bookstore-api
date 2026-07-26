"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.post("/logout", auth_middleware_1.requireAuth, auth_controller_1.logout);
router.post("/forgot-password", auth_controller_1.forgotPasswordController);
router.post("/reset-password/:token", auth_controller_1.resetPasswordController);
// Temporary Test Route
router.get("/admin-test", auth_middleware_1.requireAuth, (0, role_middleware_1.requireRole)(client_1.Role.ADMIN), (req, res) => {
    res.json({
        message: "Welcome Admin",
    });
});
exports.default = router;
