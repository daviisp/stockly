import "server-only";
import { auth } from "@/services/auth";
import { prisma } from "@/lib/prisma";

type DashboardDto = {
  totalSales: number;
  totalSalesToday: number;
  totalSalesQuantity: number;
  totalStock: number;
  totalProducts: number;
};

export const getDashboard = async (): Promise<DashboardDto> => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  const totalSalesQuery = prisma.sale.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      userId: session.user.id,
    },
  });

  const totalSalesTodayQuery = prisma.sale.aggregate({
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

  const totalSalesQuantityQuery = prisma.sale.count({
    where: {
      userId: session.user.id,
    },
  });

  const totalStockQuery = prisma.product.aggregate({
    _sum: {
      stock: true,
    },
    where: {
      userId: session.user.id,
    },
  });

  const totalProductsQuery = prisma.product.count({
    where: {
      userId: session.user.id,
    },
  });

  const [
    totalSales,
    totalSalesToday,
    totalSalesQuantity,
    totalStock,
    totalProducts,
  ] = await Promise.all([
    totalSalesQuery,
    totalSalesTodayQuery,
    totalSalesQuantityQuery,
    totalStockQuery,
    totalProductsQuery,
  ]);

  return {
    totalSales: Number(totalSales._sum.totalPrice),
    totalSalesToday: Number(totalSalesToday._sum.totalPrice),
    totalSalesQuantity,
    totalStock: totalStock._sum.stock as number,
    totalProducts,
  };
};
