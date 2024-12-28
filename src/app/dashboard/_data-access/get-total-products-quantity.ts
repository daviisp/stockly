import "server-only";

import { auth } from "@/services/auth";
import { prisma } from "@/lib/prisma";

export const getTotalProductsQuantity = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  return await prisma.product.count({
    where: {
      userId: session.user.id,
    },
  });
};
