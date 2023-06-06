import { type PrismaClient } from "@prisma/client";

import { type DriverRepository } from "../core/ports/driverRepository";

export const createPrismaDriverRepo = (
  prisma: PrismaClient,
): DriverRepository => {
  return {
    findById: async (id) => {
      const driver = await prisma.driver.findUnique({
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
      });
      return driver;
    },

    save: async (driver) => {
      const result = await prisma.driver.upsert({
        where: {
          id: driver.id,
        },
        include: {
          rides: {
            include: {
              locations: true,
            },
          },
        },
        update: {
          bio: driver.bio,
          rules: driver.rules,
          capacity: driver.capacity,
        },
        create: {
          id: driver.id,
          bio: driver.bio,
          rules: driver.rules,
          capacity: driver.capacity,
        },
      });

      return result;
    },

    save: async (driver) => {
      const newDriver = await prisma.driver.upsert({
        where: {
          id: driver.id,
        },
        select: {
          id: true,
          capacity: true,
          rides: {
            select: {
              id: true,
              driverId: true,
              locations: true,
              status: true,
              departAt: true,
            },
          },
        },
        update: {
          capacity: driver.capacity,
        },
        create: {
          id: driver.id,
          capacity: driver.capacity,
        },
      });
      return newDriver;
    },
  };
};
