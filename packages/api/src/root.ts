import { driverRouter } from "./router/driver";
import { riderRouter } from "./router/rider";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  rider: riderRouter,
  driver: driverRouter,
  hello: publicProcedure.query(({ ctx }) => {
    return {
      message: ctx.helloService.hello("BaBa"),
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
