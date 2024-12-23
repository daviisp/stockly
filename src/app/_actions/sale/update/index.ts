"use server";

import { auth } from "@/services/auth";
import { UpdateSaleSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateSale = async (data: UpdateSaleSchema) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado.");
  }

  const product = await prisma.product.findFirst({
    where: {
      id: data.productId,
    },
  });

  if (!product) {
    throw new Error("Venda não encontrada.");
  }

  if (product.stock < data.productQuantity) {
    throw new Error("Quantidade maior da que disponível em estoque");
  }

  await prisma.sale.update({
    where: {
      id: data.id,
    },
    data: {
      productQuantity: {
        increment: data.productQuantity,
      },
    },
  });

  await prisma.product.update({
    where: {
      id: data.productId,
    },
    data: {
      stock: {
        decrement: data.productQuantity,
      },
    },
  });

  revalidatePath("/sales");
  revalidatePath("/products");
};
