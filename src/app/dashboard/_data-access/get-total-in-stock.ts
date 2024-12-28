import "server-only";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";

export const getTotalInStock = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  const totalInStock = await prisma.product.aggregate({
    _sum: {
      stock: true,
    },
    where: {
      userId: session.user.id,
    },
  });

  return Number(totalInStock._sum.stock);
};
