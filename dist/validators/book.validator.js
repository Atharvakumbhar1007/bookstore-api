"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(100),
    author: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(100),
    price: zod_1.z
        .number()
        .positive(),
    description: zod_1.z
        .string()
        .trim()
        .optional(),
    categoryId: zod_1.z
        .number()
        .int()
        .positive(),
});
exports.BookSchema = zod_1.z.object({});
