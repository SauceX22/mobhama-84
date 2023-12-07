import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export async function getCurrentUser() {
    const session = await getServerSession(authOptions)

    return session?.user ?? {
        id: "13651651ads6f51as65df65asd6f4a",
        name: "some name",
        email: "email@emailexample.com",
        image: "https://avatars.githubusercontent.com/u/13651651?v=4",
    }
}

