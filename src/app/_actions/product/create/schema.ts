import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome do produto deve ter pelo menos 1 caractere",
  }),
  price: z.coerce.number().positive().min(0.01),
  stock: z.coerce.number().int().min(0),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
