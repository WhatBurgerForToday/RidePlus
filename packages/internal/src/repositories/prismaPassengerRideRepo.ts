import { type PrismaClient } from "@prisma/client";
import { z } from "zod";

import { type PassengerRideRepository } from "~/core/ports/passengerRideRepository";
import { locationsToConnectOrCreate } from "./locationToConnectOrCreate";

export const locationsSchema = z.array(
  z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
);

export const createPrismaPassengerRideRepo = (
  prisma: PrismaClient,
): PassengerRideRepository => {
  return {
    save: async (input) => {
      const ride = await prisma.passengerRide.upsert({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          driverId: true,
          passengerId: true,
          driverRideId: true,
          status: true,
          locations: true,
        },
        // TODO: finish the update
        update: {
          status: input.status,
          locations: {
            connectOrCreate: locationsToConnectOrCreate(input.locations),
          },
        },
        create: {
          driverId: input.driverId,
          locations: {
            connectOrCreate: locationsToConnectOrCreate(input.locations),
          },
          passengerId: input.passengerId,
          driverRideId: input.driverRideId,
        },
      });

      return ride;
    },
  };
};
