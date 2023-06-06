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

    findByDriverId: async (driverId) => {
      const reviews = await prisma.rideReview.findMany({
        where: {
          driverId,
        },
      });

      return reviews.map((review) => ({
        id: review.id,
        driverId: review.driverId,
        passengerId: review.passengerId,
        stars: review.stars,
        comment: review.comment,
        rideId: review.driverRideId,
      }));
    },

    save: async (review) => {
      const newReview = await prisma.rideReview.upsert({
        where: {
          id: review.id,
        },
        update: {
          stars: review.stars,
          comment: review.comment,
        },
        create: {
          driverId: review.driverId,
          passengerId: review.passengerId,
          stars: review.stars,
          comment: review.comment,
          driverRideId: review.rideId,
        },
      });

      return {
        id: newReview.id,
        driverId: newReview.driverId,
        passengerId: newReview.passengerId,
        stars: newReview.stars,
        comment: newReview.comment,
        rideId: newReview.driverRideId,
      };
    },
  };
};
