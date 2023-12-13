import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Project } from "@/types";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      return response.json() as unknown as Project;
    }),

  updateProject: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/projects/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      return response.json() as unknown as Project;
    }),

  deleteProject: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const response = await fetch(`/api/projects/${input}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
    }),

  getProject: protectedProcedure.query(async ({ input }) => {
    const response = await fetch(`/api/projects/${input}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    return response.json() as unknown as Project;
  }),

  getProjects: protectedProcedure.query(async () => {
    const response = await fetch("/api/projects", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return response.json() as unknown as Project[];
  }),
});
