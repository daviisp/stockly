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

    const sale = await prisma.sale.findUnique({
      where: {
        id: parsedInput.id,
      },
    });

    if (!sale) {
      returnValidationErrors(updateSaleSchema, {
        _errors: ["Venda não encontrada"],
      });
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

    // Recalcular o estoque disponível
    const availableStock = product.stock + sale.productQuantity;

    if (parsedInput.productQuantity > availableStock) {
      returnValidationErrors(updateSaleSchema, {
        _errors: ["Quantidade maior do que disponível em estoque"],
      });
    }

    await prisma.$transaction(async (trx) => {
      await trx.sale.update({
        where: {
          id: parsedInput.id,
        },
        data: {
          productQuantity: parsedInput.productQuantity,
          totalPrice: Number(product.price) * parsedInput.productQuantity,
        },
      });

      const stockAdjustment =
        sale.productQuantity - parsedInput.productQuantity;

      await trx.product.update({
        where: {
          id: parsedInput.productId,
        },
        data: {
          stock: {
            increment: stockAdjustment,
          },
        },
      });
    });

    revalidatePath("/sales");
    revalidatePath("/products");
  });
