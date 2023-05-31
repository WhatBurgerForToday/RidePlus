import { type PrismaClient } from "@prisma/client";

import { type DriverRideRepository } from "~/core/ports/driverRideRepository";

export const createPrismaDriverRideRepo = (
  _prisma: PrismaClient,
): DriverRideRepository => {
  return {
    create: (_ride) => {
      throw new Error("Not implemented yet");
    },
  };
};
