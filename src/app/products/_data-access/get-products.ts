import "server-only";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";

export type ProductsDto = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export const getProducts = async (): Promise<ProductsDto[]> => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado.");
  }

  const products = await prisma.product.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return products.map((prod) => ({
    id: prod.id,
    name: prod.name,
    price: Number(prod.price),
    stock: prod.stock,
  }));
};
