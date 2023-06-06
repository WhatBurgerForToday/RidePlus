import { type PrismaClient } from "@prisma/client";

import { type Location } from "../core/domain/location";
import { type DriverRideRepository } from "../core/ports/driverRideRepository";

const locationToRangeFilter = (location: Location, range: number) => {
  return {
    latitude: {
      gte: location.latitude - range,
      lte: location.latitude + range,
    },
    longitude: {
      gte: location.longitude - range,
      lte: location.longitude + range,
    },
  };
};

const LONG_LAT_OFFSET = 0.005;

export const createPrismaDriverRideRepo = (
  prisma: PrismaClient,
): DriverRideRepository => {
  return {
    save: async (input) => {
      const ride = await prisma.driverRide.upsert({
        where: {
          id: input.id,
        },
        include: {
          locations: true,
        },
        update: {
          locations: {
            connectOrCreate: input.locations.map((location, index) => ({
              /* eslint-disable @typescript-eslint/no-non-null-assertion */
              where: {
                driverRideId_latitude_longitude: {
                  driverRideId: input.id!,
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
              },
              create: {
                driverRideId: input.id!,
                latitude: location.latitude,
                longitude: location.longitude,
                name: location.name,
                serialNumber: index,
              },
            })),
          },
          status: input.status,
        },
        create: {
          driverId: input.driverId,
          locations: {
            createMany: {
              data: input.locations.map((location, index) => ({
                ...location,
                serialNumber: index,
              })),
            },
          },
          departAt: input.departAt,
        },
      });
      return ride;
    },

    findById: async (id) => {
      const ride = await prisma.driverRide.findUnique({
        where: {
          id,
        },
        include: {
          locations: true,
        },
      });
      return ride;
    },

    findByNearbyLocations: async (input) => {
      const driverRide = await prisma.driverRide.findMany({
        where: {
          AND: [
            {
              locations: {
                some: locationToRangeFilter(input.source, LONG_LAT_OFFSET),
              },
            },
            {
              locations: {
                some: locationToRangeFilter(input.destination, LONG_LAT_OFFSET),
              },
            },
          ],
        },
        include: {
          locations: true,
          driver: {
            include: {
              receivedReview: true,
            },
          },
          passengerRides: {
            include: {
              passenger: true,
            },
          },
        },
        take: input.limit,
      });

      return driverRide.map((ride) => {
        return {
          ...ride,
          driver: {
            ...ride.driver,
            receivedReview: ride.driver.receivedReview.map((review) => ({
              ...review,
              rideId: review.driverRideId,
            })),
          },
          passengers: ride.passengerRides.map(
            (passengerRide) => passengerRide.passenger,
          ),
        };
      });
    },
  };
};
