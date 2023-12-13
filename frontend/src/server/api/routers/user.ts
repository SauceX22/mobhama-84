import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { User } from "@/types";

export const userRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async () => {
    const response = await fetch("/api/users", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json() as unknown as User[];
  }),
});
