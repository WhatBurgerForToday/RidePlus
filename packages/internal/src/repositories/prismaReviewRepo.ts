import { type PrismaClient } from "@prisma/client";

import { type ReviewRepository } from "../core/ports";

export const createPrismaReviewRepo = (
  prisma: PrismaClient,
): ReviewRepository => {
  return {
    calculateDriverStars: async (driverId) => {
      const stars = await prisma.rideReview.aggregate({
        _avg: {
          stars: true,
        },
        where: {
          driverId,
        },
      });
      return stars._avg.stars ?? 0;
    },
  };
};
