import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(100),
  author: z.string().trim().min(2, "Author must be at least 2 characters").max(100),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().trim().optional(),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
});