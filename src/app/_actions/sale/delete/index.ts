"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";
import { deleteSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    await prisma.sale.delete({
      where: {
        id: parsedInput.id,
      },
    });

    revalidatePath("/sales");
  });
