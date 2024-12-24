"use server";

import { auth } from "@/services/auth";
import { updateSaleSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const updateSale = actionClient
  .schema(updateSaleSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    const product = await prisma.product.findFirst({
      where: {
        id: parsedInput.productId,
      },
    });

    if (!product) {
      returnValidationErrors(updateSaleSchema, {
        _errors: ["Produto não encontrado"],
      });
    }

    if (product.stock < parsedInput.productQuantity) {
      returnValidationErrors(updateSaleSchema, {
        _errors: ["Quantidade maior da que disponível em estoque"],
      });
    }

    await prisma.$transaction(async (trx) => {
      await trx.sale.update({
        where: {
          id: parsedInput.id,
        },
        data: {
          productQuantity: parsedInput.productQuantity,
        },
      });

      await trx.product.update({
        where: {
          id: parsedInput.productId,
        },
        data: {
          stock: {
            decrement: parsedInput.productQuantity,
          },
        },
      });
    });

    revalidatePath("/sales");
    revalidatePath("/products");
  });
