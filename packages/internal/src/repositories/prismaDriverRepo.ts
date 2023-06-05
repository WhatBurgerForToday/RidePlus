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
        select: {
          id: true,
          rides: {
            select: {
              id: true,
              driverId: true,
              locations: true,
              status: true,
              departAt: true,
            },
          },
          capacity: true,
        },
      });
      return driver;
    },

    findReviews: async (driverId) => {
      const reviews = await prisma.rideReview.findMany({
        where: {
          driverId,
        },
      });

      // only expose the fields in the domain model
      return reviews.map((review) => ({
        id: review.id,
        stars: review.stars,
        comment: review.comment,
      }));
    },
  };
};
