import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Team } from "@/types";

export const teamRouter = createTRPCRouter({
  getTeams: publicProcedure.query(async () => {
    const response = await fetch("localhost:8080/teams", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch teams");
    }

    return response.json() as unknown as Team[];
  }),
});
