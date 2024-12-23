import { object, z } from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    object({
      id: z.string().uuid(),
      quantity: z.coerce.number().int().positive(),
    })
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
