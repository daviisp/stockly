import "server-only";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";

type PopularProductsDto = {
  productId: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
  productStock: number;
};

export const getPopularProducts = async (): Promise<PopularProductsDto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  const sales = await prisma.sale.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      productId: true,
      productQuantity: true,
    },
  });

  const sortedSales = sales.sort(
    (a, b) => b.productQuantity - a.productQuantity
  );

  const topSales = sortedSales.slice(0, 5);

  return Promise.all(
    topSales.map(async (sale) => {
      const product = await prisma.product.findUnique({
        where: {
          id: sale.productId,
        },
        select: {
          name: true,
          price: true,
          stock: true,
        },
      });

      return {
        productId: sale.productId,
        productName: product?.name || "Produto não encontrado",
        productQuantity: sale.productQuantity,
        productPrice: Number(product?.price) || 0,
        productStock: product?.stock || 0,
      };
    })
  );
};
