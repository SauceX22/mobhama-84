import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { User, UserRole, UserStatus } from "next-auth";

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export async function getCurrentUser() {
  // const session = await getServerSession(authOptions);

  const user = await Promise.resolve({
    id: "6b132196-2f87-5719-ba85-5215076c2c241",
    name: "mahmoud",
    email: "mahmoud@gmail.com",
    phoneNum: "123456789",
    image: "https://avatars.githubusercontent.com/u/4726921?v=4",
    avatar: "https://avatars.githubusercontent.com/u/4726921?v=4",
    role: "admin" as UserRole,
    status: "active" as UserStatus,
  } as User);
  return user;

  // return session?.user;
}
