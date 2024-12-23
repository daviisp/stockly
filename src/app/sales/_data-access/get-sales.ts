import "server-only";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";

export type SalesDto = {
  id: string;
  productId: string;
  productName: string;
  productQuantity: number;
  unitPrice: number;
  createdAt: Date;
};

export const getSales = async (): Promise<SalesDto[]> => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  const sales = await prisma.sale.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    productId: sale.productId,
    productName: sale.productName,
    productQuantity: sale.productQuantity,
    unitPrice: Number(sale.unitPrice),
    createdAt: sale.createdAt,
  }));
};
