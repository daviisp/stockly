"use server";

import { auth } from "@/services/auth";
import { upsertProductSchema, UpsertProductSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const upsertProduct = async (data: UpsertProductSchema) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado.");
  }

  upsertProductSchema.parse(data);

  await prisma.product.upsert({
    where: {
      id: data.id || "",
    },
    update: {
      name: data.name,
      price: data.price,
      stock: data.stock,
    },
    create: {
      name: data.name,
      price: data.price,
      stock: data.stock,
      userId: session.user.id as string,
    },
  });

  revalidatePath("/products");
};
