import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Reservation } from "@/types";

export const reservationRouter = createTRPCRouter({
  createReservation: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      return response.json() as unknown as Reservation;
    }),

  updateReservation: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/reservations/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }

      return response.json() as unknown as Reservation;
    }),

  deleteReservation: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/reservations/${input}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }
    }),

  getReservation: protectedProcedure.query(async ({ input }) => {
    const response = await fetch(`/api/reservations/${input}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reservation");
    }

    return response.json() as unknown as Reservation;
  }),

  getReservations: protectedProcedure.query(async () => {
    const response = await fetch("/api/reservations", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reservations");
    }

    return response.json() as unknown as Reservation[];
  }),
});
