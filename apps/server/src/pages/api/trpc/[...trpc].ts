import { type NextApiHandler } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter, createTRPCContext } from "@rideplus/api";

const tRPCHandler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

const handler: NextApiHandler = async (req, res) => {
  const url = new URL(req?.url ?? "", "http://localhost");

  console.time(url.pathname);
  const result = await tRPCHandler(req, res);
  console.timeEnd(url.pathname);
  return result;
};

export default handler;
