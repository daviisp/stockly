import "server-only";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";

export const getTotalRevenue = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  const totalRevenue = await prisma.sale.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      userId: session.user.id,
    },
  });

  return Number(totalRevenue._sum.totalPrice);
};
