import z from "zod";

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, {
        message: "Seu nome deve ter no mínimo 2 caracteres",
      })
      .optional(),
    email: z
      .string()
      .email({
        message: "Email inválido",
      })
      .optional(),
    image: z.string().optional(),
  })
  .refine((data) => data.name || data.email || data.image, {
    message:
      "Pelo menos um dos campos 'nome', 'email' ou 'imagem' deve ser preenchido.",
    path: ["name", "email"],
  });

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
