import { z } from "zod";

export const createBookSchema = z.object({

    title: z
        .string()
        .trim()
        .min(2)
        .max(100),

    author: z
        .string()
        .trim()
        .min(2)
        .max(100),

    price: z
        .number()
        .positive(),

    description: z
        .string()
        .trim()
        .optional(),

    categoryId: z
        .number()
        .int()
        .positive(),

});

export const BookSchema = z.object({

}
);