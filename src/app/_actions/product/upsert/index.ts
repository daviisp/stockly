"use server";

import { auth } from "@/services/auth";
import { upsertProductSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    await prisma.product.upsert({
      where: {
        id: parsedInput.id || "",
      },
      update: {
        name: parsedInput.name,
        price: parsedInput.price,
        stock: parsedInput.stock,
      },
      create: {
        name: parsedInput.name,
        price: parsedInput.price,
        stock: parsedInput.stock,
        userId: session.user.id as string,
      },
    });

    revalidatePath("/products");
  });
