import { clerkPlugin } from "@clerk/fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { appRouter, createTRPCContext } from "@rideplus/api";

const startServer = async () => {
  const server = fastify({ logger: true });
  try {
    await server.register(fastifyTRPCPlugin, {
      prefix: "/api/trpc",
      trpcOptions: { router: appRouter, createContext: createTRPCContext },
    });

    await server.register(clerkPlugin);

    await server.listen({ port: 3000, host: "::" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void startServer();
