"use server";

import { signIn } from "@/services/auth";

export const authWithGoogle = async () => {
  await signIn("google");
};
