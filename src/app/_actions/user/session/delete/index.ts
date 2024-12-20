"use server";

import { cookies } from "next/headers";

export const deleteAuthCookies = async () => {
  const cookiesStore = await cookies();
  const cookiesToDelete = [
    "authjs.callback-url",
    "authjs.csrf-token",
    "authjs.session-token",
  ];

  cookiesToDelete.forEach((cookie) => cookiesStore.delete(cookie));
};
