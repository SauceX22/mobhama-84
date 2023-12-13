import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { type User } from "next-auth";

export const userRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async () => {
    const response = await fetch("localhost:8080/api/users", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json() as unknown as User[];
  }),
});
