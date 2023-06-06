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
  };
};
