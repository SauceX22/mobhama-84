import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User, type NextAuthOptions } from "next-auth";
import { db } from "@/lib/db";
import GitHubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'mahmoud@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        try {
          const response = await axios.get("http://localhost:8080/login", {
            params: {
              username: "Hamoud",
            },
            maxBodyLength: Infinity,
            // Add other necessary fields if needed
          });

          // Check if the response is successful and return user data
          if (response.status === 200) {
            console.log(response.data);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const user = response.data;
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          // Handle errors and return null
          console.error("Error during login:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};
