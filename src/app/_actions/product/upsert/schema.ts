import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "O nome do produto deve ter pelo menos 1 caractere",
  }),
  price: z.coerce
    .number({
      message: "O preço do produto deve ser um número",
    })
    .positive({
      message: "O preço do produto deve ser um valor positivo",
    })
    .min(0.01, {
      message: "O preço do produto deve ser de pelo menos 1 centavo",
    }),
  stock: z.coerce
    .number({
      message: "O estoque do produto deve ser um número",
    })
    .int({
      message: "O estoque do produto deve ser um número inteiro",
    })
    .min(0, {
      message: "O estoque do produto deve ser um número positivo",
    }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
