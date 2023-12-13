import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Team } from "@/types";

export const teamRouter = createTRPCRouter({
  createTeam: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      return response.json() as unknown as Team;
    }),
  updateTeam: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/teams/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update team");
      }

      return response.json() as unknown as Team;
    }),

  deleteTeam: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/teams/${input}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete team");
      }
    }),
  getTeam: protectedProcedure.query(async ({ input }) => {
    const response = await fetch(`/api/teams/${input}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch team");
    }

    return response.json() as unknown as Team;
  }),

  getTeams: protectedProcedure.query(async () => {
    const response = await fetch("/api/teams", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch teams");
    }

    return response.json() as unknown as Team[];
  }),
});
