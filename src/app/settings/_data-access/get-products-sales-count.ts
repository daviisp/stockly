import "server-only";

import { auth } from "@/services/auth";
import { prisma } from "@/lib/prisma";

type ProductsSalesCountDto = {
  productsQuantity: number;
  salesQuantity: number;
};

export const getProductsSalesCount =
  async (): Promise<ProductsSalesCountDto> => {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Usuário não autorizado");
    }

    const [products, sales] = await Promise.all([
      prisma.product.count({
        where: {
          userId: session.user.id,
        },
      }),
      prisma.sale.count({
        where: {
          userId: session.user.id,
        },
      }),
    ]);

    return {
      productsQuantity: products,
      salesQuantity: sales,
    };
  };
