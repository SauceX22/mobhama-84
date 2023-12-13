import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Reservation } from "@/types";

export const reservationRouter = createTRPCRouter({
  getReservation: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input }) => {
      const response = await fetch(`/api/reservations/${input.id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reservation");
      }

      return response.json() as unknown as Reservation;
    }),

  getReservations: protectedProcedure
    .input(z.object({ projectId: z.string().min(1) }))
    .query(async () => {
      const response = await fetch("/api/reservations", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      return response.json() as unknown as Reservation[];
    }),
});
