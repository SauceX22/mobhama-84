import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Schedule } from "@/types";

export const scheduleRouter = createTRPCRouter({
  createSchedule: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to create schedule");
      }

      return response.json() as unknown as Schedule;
    }),

  updateSchedule: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/schedules/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update schedule");
      }

      return response.json() as unknown as Schedule;
    }),

  deleteSchedule: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/schedules/${input}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete schedule");
      }
    }),

  getSchedule: protectedProcedure.query(async ({ input }) => {
    const response = await fetch(`/api/schedules/${input}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch schedule");
    }

    return response.json() as unknown as Schedule;
  }),

  getSchedules: protectedProcedure.query(async () => {
    const response = await fetch("/api/schedules", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch schedules");
    }

    return response.json() as unknown as Schedule[];
  }),
});
