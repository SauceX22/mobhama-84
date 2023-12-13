import { machineRouter } from "@/server/api/routers/machine";
import { projectRouter } from "@/server/api/routers/project";
import { reservationRouter } from "@/server/api/routers/reservation";
import { teamRouter } from "@/server/api/routers/team";
import { scheduleRouter } from "@/server/api/routers/schedule";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  machine: machineRouter,
  project: projectRouter,
  reservation: reservationRouter,
  team: teamRouter,
  schedule: scheduleRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
