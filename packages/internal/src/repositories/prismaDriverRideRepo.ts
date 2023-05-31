import { type PrismaClient } from "@prisma/client";

import { type DriverRideRepository } from "~/core/ports/driverRideRepository";

export const createPrismaDriverRideRepo = (
  prisma: PrismaClient,
): DriverRideRepository => {
  return {
    create: async (input) => {
      await prisma.ride.create({
        data: {
          driverId: input.driverId,
          locations: JSON.stringify(input.locations),
        },
      });
    },
  };
};
