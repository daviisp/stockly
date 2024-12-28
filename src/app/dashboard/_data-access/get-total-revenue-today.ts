import "server-only";

import { auth } from "@/services/auth";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export const getTotalRevenueToday = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  const totalRevenueToday = await prisma.sale.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      userId: session.user.id,
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  return Number(totalRevenueToday._sum.totalPrice);
};
