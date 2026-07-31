"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookController = exports.updateBookController = exports.getBooksByCategoryController = exports.getAllBooksController = exports.getBookByIdController = exports.createBookController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const book_service_1 = require("../services/book.service");
const book_validator_1 = require("../validators/book.validator");
exports.createBookController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = book_validator_1.BookSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const { title, author, description, price, categoryId, } = result.data;
    const ownerId = req.user.id;
    const book = await (0, book_service_1.createBook)(title, author, price, description, categoryId, ownerId);
    return res.status(201).json({
        message: "Book created successfully",
        book,
    });
});
exports.getBookByIdController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new ApiError_1.ApiError(400, "Invalid Book ID");
    }
    const book = await (0, book_service_1.getBookById)(id, req.user.role, req.user.id);
    return res.status(200).json({
        message: "Book fetched successfully",
        book,
    });
});
exports.getAllBooksController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const books = await (0, book_service_1.getAllBooks)(req.user.role, req.user.id);
    return res.status(200).json({
        message: "Books fetched successfully",
        books,
    });
});
exports.getBooksByCategoryController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const categoryId = Number(req.params.id);
    if (Number.isNaN(categoryId)) {
        throw new ApiError_1.ApiError(400, "Invalid Category ID");
    }
    const books = await (0, book_service_1.getBooksByCategory)(categoryId, req.user.role, req.user.id);
    return res.status(200).json({
        message: "Books fetched successfully",
        count: books.length,
        books,
    });
});
exports.updateBookController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new ApiError_1.ApiError(400, "Invalid Book ID");
    }
    const result = book_validator_1.BookSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }
    const { title, author, price, description, categoryId, } = result.data;
    const book = await (0, book_service_1.updateBook)(id, title, author, price, description, categoryId, req.user.role, req.user.id);
    return res.status(200).json({
        message: "Book updated successfully",
        book,
    });
});
exports.deleteBookController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new ApiError_1.ApiError(400, "Invalid Book ID");
    }
    const result = await (0, book_service_1.deleteBook)(id, req.user.role, req.user.id);
    return res.status(200).json(result);
});
