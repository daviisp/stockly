"use server";

import { auth } from "@/services/auth";
import { createSaleSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    await prisma.$transaction(async (trx) => {
      for (const prod of parsedInput.products) {
        const productInDb = await prisma.product.findUnique({
          where: {
            id: prod.id,
          },
        });

        if (!productInDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Produto não encontrado"],
          });
        }

        if (productInDb.stock < prod.quantity) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Quantidade maior da que disponível em estoque"],
          });
        }

        await trx.sale.upsert({
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
            userId: session.user?.id as string,
          },
        });

        await trx.product.update({
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
    });

    revalidatePath("/sales");
    revalidatePath("/products");
  });
