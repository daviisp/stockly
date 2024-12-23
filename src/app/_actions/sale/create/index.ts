"use server";

import { auth } from "@/services/auth";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createSale = async (data: CreateSaleSchema) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado.");
  }

  createSaleSchema.parse(data);

  for (const prod of data.products) {
    const productInDb = await prisma.product.findUnique({
      where: {
        id: prod.id,
      },
    });

    if (!productInDb) {
      throw new Error("Produto não encontrado");
    }

    if (productInDb.stock < prod.quantity) {
      throw new Error("Quantidade maior do que disponível em estoque");
    }

    await prisma.sale.upsert({
      where: {
        productId: productInDb.id || "",
      },
      update: {
        productQuantity: {
          increment: prod.quantity,
        },
      },
      create: {
        productId: productInDb.id,
        productName: productInDb.name,
        productQuantity: prod.quantity,
        unitPrice: productInDb.price,
        userId: session.user.id as string,
      },
    });

    await prisma.product.update({
      where: {
        id: productInDb.id,
      },
      data: {
        stock: {
          decrement: prod.quantity,
        },
      },
    });
  }

  revalidatePath("/sales");
  revalidatePath("/products");
};
