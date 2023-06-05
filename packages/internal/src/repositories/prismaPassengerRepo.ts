import { type PrismaClient } from "@prisma/client";

import { type PassengerRepository } from "../core/ports";

export const createPrismaPassengerRepo = (
  prisma: PrismaClient,
): PassengerRepository => {
  return {
    findOrCreate: async (id) => {
      const passenger = await prisma.passenger.upsert({
        where: {
          id,
        },
        include: {
          rides: {
            include: {
              locations: true,
            },
          },
        },
        update: {},
        create: {
          id,
          bio: "",
        },
      });

      return passenger;
    },
  };
};
