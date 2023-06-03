import { type PrismaClient } from "@prisma/client";

import { type DriverRideRepository } from "~/core/ports/driverRideRepository";
import { locationsToConnectOrCreate } from "./locationToConnectOrCreate";

export const createPrismaDriverRideRepo = (
  prisma: PrismaClient,
): DriverRideRepository => {
  return {
    save: async (input) => {
      const ride = await prisma.driverRide.upsert({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          driverId: true,
          locations: true,
          status: true,
          departAt: true,
        },
        update: {
          locations: {
            connectOrCreate: locationsToConnectOrCreate(input.locations),
          },
          status: input.status,
        },
        create: {
          driverId: input.driverId,
          locations: {
            connectOrCreate: locationsToConnectOrCreate(input.locations),
          },
          departAt: input.departAt,
        },
      });
      return ride;
    },
  };
};
