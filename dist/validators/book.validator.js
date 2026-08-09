"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const zod_1 = require("zod");
exports.BookSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(2, "Title must be at least 2 characters").max(100),
    author: zod_1.z.string().trim().min(2, "Author must be at least 2 characters").max(100),
    price: zod_1.z.number().positive("Price must be a positive number"),
    description: zod_1.z.string().trim().optional(),
    categoryId: zod_1.z.number().int().positive("Category ID must be a positive integer"),
});
