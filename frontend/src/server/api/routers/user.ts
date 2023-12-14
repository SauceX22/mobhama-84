import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { type User } from "next-auth";
import axios from "axios";

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      return response.data as User[];
    } catch (error) {
      console.error("Error during login:", error);
      return Promise.resolve(null);
    }
  }),
  addUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phoneNum: z.string(),
        image: z.string(),
        avatar: z.string(),
        role: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios.post("http://localhost:8080/users", {
          name: input.name,
          email: input.email,
          phoneNum: input.phoneNum,
          image: input.image,
          avatar: input.avatar,
          role: input.role,
          status: input.status,
        });
        return response.data as User;
      } catch (error) {
        console.error("Error during login:", error);
        return Promise.resolve(null);
      }
    }),
  updateUserRole: publicProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/users/${input.id}`,
          {
            role: input.role,
          },
        );
        return response.data as User;
      } catch (error) {
        console.error("Error during login:", error);
        return Promise.resolve(null);
      }
    }),
});
