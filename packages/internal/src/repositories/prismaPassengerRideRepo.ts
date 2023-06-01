import { type PrismaClient } from "@prisma/client";
import { z } from "zod";

import { type PassengerRideRepository } from "~/core/ports/passengerRideRepository";

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
      const ride = await prisma.ride.upsert({
        where: {
          id: input.id,
        },
        update: {
          locations: JSON.stringify(input.locations),
          status: input.status,
        },
        create: {
          id: input.id,
          driverId: input.driverId,
          locations: JSON.stringify(input.locations),
          status: input.status,
        },
      });

      const locations = JSON.parse(ride.locations) as unknown;
      const parsedLocations = await locationsSchema.parseAsync(locations);

      return {
        ...ride,
        locations: parsedLocations,
      };
    },
  };
};
