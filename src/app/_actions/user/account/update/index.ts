"use server";

import { auth } from "@/services/auth";
import { updateUserSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";

export const updateUser = actionClient
  .schema(updateUserSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: parsedInput.name,
        email: parsedInput.email,
        image: parsedInput.image,
      },
    });

    revalidatePath("/profile");
  });
