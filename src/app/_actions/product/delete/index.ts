"use server";

import { auth } from "@/services/auth";

import { prisma } from "@/lib/prisma";
import { deleteProductSchema, DeleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (data: DeleteProductSchema) => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  deleteProductSchema.parse(data);

  await prisma.product.delete({
    where: {
      id: data.id,
      userId: session.user.id,
    },
  });

  revalidatePath("/products");
};
