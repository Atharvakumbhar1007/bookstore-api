"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must contain at least 2 characters")
        .max(50),
    email: zod_1.z
        .string()
        .email("Invalid email address"),
});
