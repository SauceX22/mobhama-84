// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  type User,
  type NextAuthOptions,
  UserRole,
  UserStatus,
} from "next-auth";
// import { db } from "@/lib/db";
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
  // adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  debug: env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      id: "credentials",
      type: "credentials",
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

        // try {
        //   const response = await axios.get("http://localhost:8080/login", {
        //     params: {
        //       username: credentials?.username,
        //     },
        //     withCredentials: true, // Set to `true` to send cookies when making cross-origin requests
        //     // set the host as "localhost:8080"
        //     headers: {
        //       host: "localhost:8080",
        //     },
        //     // Add other necessary fields if needed
        //   });

        //   // Check if the response is successful and return user data
        //   if (response.status === 200) {
        //     console.log(response.data);
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        //     const user = response.data;
        //     return Promise.resolve(user);
        //   } else {
        //     return Promise.resolve(null);
        //   }
        // } catch (error) {
        //   // Handle errors and return null
        //   console.error("Error during login:", error);
        //   return Promise.resolve(null);
        // }
        // request above not working, return dummy user for now
        const user: User = {
          id: "6b132196-2f87-5719-ba85-5215076c2c241",
          name: "mahmoud",
          email: "mahmoud@gmail.com",
          phoneNum: "123456789",
          image: "https://avatars.githubusercontent.com/u/4726921?v=4",
          avatar: "https://avatars.githubusercontent.com/u/4726921?v=4",
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
        };
        return user;
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
        session.user.avatar = token.picture ?? "";
      }

      return session;
    },
  },
};
