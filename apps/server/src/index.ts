import { clerkPlugin } from "@clerk/fastify";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import type { PinoLoggerOptions } from "fastify/types/logger";

import { appRouter, createTRPCContext } from "@rideplus/api";
import { env } from "./env";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: true,
        ignore: "pid,hostname,reqId,req,res",
        messageFormat: "{msg} [id={reqId} {req.method}]",
      },
    },
  } satisfies PinoLoggerOptions,
  production: true,
  test: false,
};

const startServer = async () => {
  const server = fastify({
    logger: envToLogger[env.NODE_ENV] ?? true,
  });

  try {
    await server.register(cors, {
      origin: "*",
    });

    await server.register(fastifyTRPCPlugin, {
      prefix: "/api/trpc",
      trpcOptions: { router: appRouter,  createContext: createTRPCContext },
    });

    await server.register(clerkPlugin);

    server.get("/", () => ({ hello: "world" }));

    await server.listen({ host: "0.0.0.0", port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void startServer();
