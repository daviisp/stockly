import "server-only";

import dayjs from "dayjs";
import { auth } from "@/services/auth";
import { prisma } from "@/lib/prisma";

export type Last14DaysRevenueDto = {
  day: string;
  totalRevenue: number;
};

export const getLast14DaysRevenue = async (): Promise<
  Last14DaysRevenueDto[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  const today = dayjs().endOf("day").toDate();

  const last14Days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((day) =>
    dayjs(today).subtract(day, "day")
  );

  const last14Sales = await Promise.all(
    last14Days.map(async (day) => {
      const salesData = await prisma.sale.aggregate({
        _sum: {
          totalPrice: true,
        },
        where: {
          userId: session.user?.id,
          createdAt: {
            gte: day.startOf("day").toDate(),
            lte: day.endOf("day").toDate(),
          },
        },
      });

      return {
        day: day.format("DD/MM"),
        totalRevenue: Number(salesData._sum.totalPrice),
      };
    })
  );

  return last14Sales;
};
