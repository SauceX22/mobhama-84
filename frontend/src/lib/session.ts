import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
