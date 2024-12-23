"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";
import { deleteSaleSchema, DeleteSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteSale = async (data: DeleteSaleSchema) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado.");
  }

  deleteSaleSchema.parse(data);

  await prisma.sale.delete({
    where: {
      id: data.id,
    },
  });

  revalidatePath("/sales");
};
