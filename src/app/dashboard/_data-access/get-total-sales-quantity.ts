import "server-only";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";

export const getTotalSalesQuantity = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado");
  }

  return await prisma.sale.count({
    where: {
      userId: session.user.id,
    },
  });
};
