import { driverRouter } from "./router/driver";
import { riderRouter } from "./router/rider";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  rider: riderRouter,
  driver: driverRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
