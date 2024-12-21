"use server";

import { auth } from "@/services/auth";
import { createProductSchema, CreateProductSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createProduct = async (data: CreateProductSchema) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado.");
  }

  createProductSchema.parse(data);

  await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock,
      userId: session.user.id as string,
    },
  });

  revalidatePath("/products");
};
