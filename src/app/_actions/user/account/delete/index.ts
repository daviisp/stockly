"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/services/auth";
import { deleteAuthCookies } from "../../session/delete";
import { redirect } from "next/navigation";

export const deleteUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await Promise.all([
    prisma.user.delete({
      where: {
        id: session.user.id,
      },
    }),
    deleteAuthCookies(),
  ]);

  redirect("/auth");
};
