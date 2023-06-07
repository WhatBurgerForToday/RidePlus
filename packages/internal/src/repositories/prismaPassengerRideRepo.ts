import { type PrismaClient } from "@prisma/client";
import { z } from "zod";

import { type PassengerRideRepository } from "../core/ports/passengerRideRepository";

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
        include: {
          locations: true,
        },
        update: {
          status: input.status,
          locations: {
            connect: input.locations.map((location) => ({
              driverRideId_latitude_longitude: {
                driverRideId: input.driverRideId,
                latitude: location.latitude,
                longitude: location.longitude,
              },
            })),
          },
        },
        create: {
          driverId: input.driverId,
          locations: {
            connect: input.locations.map((location) => ({
              driverRideId_latitude_longitude: {
                driverRideId: input.driverRideId,
                latitude: location.latitude,
                longitude: location.longitude,
              },
            })),
          },
          passengerId: input.passengerId,
          driverRideId: input.driverRideId,
        },
      });

      return ride;
    },

    findByDriverRideId: async (driverRideId, passengerId) => {
      const ride = await prisma.passengerRide.findUnique({
        where: {
          driverRideId_passengerId: {
            driverRideId,
            passengerId,
          },
        },
        include: {
          locations: true,
        },
      });

      return ride;
    },

    countByDriverRideId: async (driverRideId) => {
      const count = await prisma.passengerRide.count({
        where: {
          driverRideId,
          status: "APPROVED",
        },
      });

      return count;
    },

    findByPassengerIdWithStatus: async (passengerId, status) => {
      const rides = await prisma.passengerRide.findMany({
        where: {
          passengerId,
          status,
        },
        include: {
          locations: true,
          driverRide: {
            select: {
              departAt: true,
            },
          },
        },
      });

      return rides;
    },

    findFavoritesByPassengerId: async (passengerId, limit) => {
      const rides = await prisma.passengerRide.findMany({
        where: {
          passengerId,
          isFavorite: true,
        },
        include: {
          driverRide: {
            select: {
              departAt: true,
            },
          },
          locations: true,
        },
        take: limit,
      });

      return rides;
    },
    findByDriverIdWithStatus: async (driverId, status) => {
      const rides = await prisma.passengerRide.findMany({
        where: {
          driverId,
          status,
        },
        include: {
          driverRide: {
            select: {
              departAt: true,
            },
          },
          locations: true,
        },
      });

      return rides;
    },
  };
};
