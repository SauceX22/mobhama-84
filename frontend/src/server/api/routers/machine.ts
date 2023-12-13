import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Machine } from "@/types";

export const machineRouter = createTRPCRouter({
  createMachine: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch("/api/machines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to create machine");
      }

      return response.json() as unknown as Machine;
    }),

  updateMachine: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/machines/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update machine");
      }

      return response.json() as unknown as Machine;
    }),

  deleteMachine: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/machines/${input}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete machine");
      }
    }),

  getMachine: protectedProcedure.query(async ({ input }) => {
    const response = await fetch(`/api/machines/${input}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch machine");
    }

    return response.json() as unknown as Machine;
  }),

  getMachines: protectedProcedure.query(async () => {
    const response = await fetch("/api/machines", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch machines");
    }

    return response.json() as unknown as Machine[];
  }),
});
