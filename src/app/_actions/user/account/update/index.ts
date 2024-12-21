"use server";

import { auth } from "@/services/auth";
import { updateUserSchema, UpdateUserSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateUser = async (data: UpdateUserSchema) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autorizado.");
  }

  updateUserSchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: data.name,
      email: data.email,
      image: data.image,
    },
  });

  revalidatePath("/profile");
};
