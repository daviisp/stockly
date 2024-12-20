import "server-only";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";

export const getProducts = async () => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  return await prisma.product.findMany({
    where: {
      userId: session.user.id,
    },
  });
};
