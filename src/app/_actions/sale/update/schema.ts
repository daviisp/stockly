import { z } from "zod";

export const updateSaleSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  productQuantity: z.coerce.number().int().positive(),
});

export type UpdateSaleSchema = z.infer<typeof updateSaleSchema>;
