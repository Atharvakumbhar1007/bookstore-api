"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const book_controller_1 = require("../controllers/book.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.requireAuth, book_controller_1.createBookController);
exports.default = router;
