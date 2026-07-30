"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooksController = exports.createBookController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const book_validator_1 = require("../validators/book.validator");
const book_service_1 = require("../services/book.service");
exports.createBookController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = book_validator_1.createBookSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const ownerId = req.user.id;
    const book = await (0, book_service_1.createBook)(result.data.title, result.data.author, result.data.price, result.data.description, result.data.categoryId, ownerId);
    return res.status(201).json({
        message: "Book created successfully",
        book,
    });
});
exports.getAllBooksController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const books = await (0, book_service_1.getAllBooks)(user.role, user.id);
    return res.status(200).json({
        books,
    });
});
