"use server";

import { auth } from "@/services/auth";

import { prisma } from "@/lib/prisma";
import { deleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    await prisma.product.delete({
      where: {
        id: parsedInput.id,
        userId: session.user.id,
      },
    });

    revalidatePath("/products");
  });
