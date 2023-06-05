import { TRPCError } from "@trpc/server";
import { match } from "ts-pattern";
import { z } from "zod";

import { PassengerServiceErrors } from "@rideplus/internal";

import { location } from "../schema/location";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const riderRouter = createTRPCRouter({
  profile: protectedProcedure.query(async ({ ctx }) => {
    const passengerProfile = await ctx.passengerService.getProfile(
      ctx.auth.userId,
    );

    const result = match(passengerProfile)
      .with({ success: true }, ({ data }) => data)
      .with({ error: PassengerServiceErrors.PASSENGER_NOT_FOUND }, () => {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Passenger not found",
        });
      })
      .exhaustive();
    return result;
  }),

  rideHistory: protectedProcedure.query(() => {
    return [
      {
        id: "1",
        source: {
          latitude: 23,
          longitude: 123,
        },
        destination: {
          latitude: 23,
          longitude: 123,
        },
        departAt: new Date(),
        driver: {
          id: "1",
          avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
        },
      },
      {
        id: "2",
        source: {
          latitude: 23,
          longitude: 123,
        },
        destination: {
          latitude: 23,
          longitude: 123,
        },
        departAt: new Date(),
        driver: {
          id: "1",
          avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
        },
      },
    ];
  }),

  recentRide: protectedProcedure.query(() => {
    // give back at most 2 recent rides.
    return [
      {
        id: "1",
        source: {
          latitude: 23,
          longitude: 123,
        },
        destination: {
          latitude: 23,
          longitude: 123,
        },
        departAt: new Date(),
      },
      {
        id: "2",
        source: {
          latitude: 23,
          longitude: 123,
        },
        destination: {
          latitude: 23,
          longitude: 123,
        },
        departAt: new Date(),
      },
    ];
  }),

  favoriteRide: protectedProcedure.query(() => {
    return [
      {
        id: "1",
        source: {
          latitude: 23,
          longitude: 123,
        },
        destination: {
          latitude: 23,
          longitude: 123,
        },
        departAt: new Date(),
      },
    ];
  }),

  approvedRide: protectedProcedure.query(async ({ ctx }) => {
    const approvedRides = await ctx.passengerService.getApprovedPassengerRides(
      ctx.auth.userId,
    );
    return approvedRides.map((ride) => {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const [source, destination] = ride.locations;
      return {
        id: ride.driverRideId,
        departAt: ride.driverRide.departAt,
        source: source!,
        desiredDestination: destination!,
        price: 100,
        driver: ride.driver!,
      };
    });
  }),

  pendingRide: protectedProcedure.query(async ({ ctx }) => {
    const pendingRides = await ctx.passengerService.getPendingPassengerRides(
      ctx.auth.userId,
    );
    return pendingRides.map((ride) => {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const [source, destination] = ride.locations;
      return {
        id: ride.driverRideId,
        departAt: ride.driverRide.departAt,
        source: source!,
        desiredDestination: destination!,
        price: 100,
        driver: ride.driver!,
      };
    });
  }),

  searchRides: protectedProcedure
    .input(
      z.object({
        source: location(),
        destination: location(),
        departAt: z.date(),
        limit: z.number().optional().default(10),
      }),
    )
    .query(({ input }) => {
      return [
        {
          id: "1",
          stars: 4,
          source: {
            name: "TSMC",
            latitude: 23,
            longitude: 123,
          },
          desiredDestination: {
            name: "NYCU",
            latitude: 23,
            longitude: 123,
          },
          price: 120,
          driver: {
            id: "1",
            name: "Simon",
            avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
            capacity: 4,
          },
          departAt: input.departAt,
          passengers: [],
        },
        {
          id: "2",
          stars: 4.3,
          source: {
            name: "TSMC ABC",
            latitude: 23,
            longitude: 123,
          },
          desiredDestination: {
            name: "NYCU ABC",
            latitude: 23,
            longitude: 123,
          },
          price: 250,
          driver: {
            id: "1",
            name: "Simon",
            avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
            capacity: 5,
          },
          departAt: input.departAt,
          passengers: [
            {
              id: "3",
              name: "Alan",
            },
          ],
        },
        {
          id: "3",
          stars: 3.3,
          source: {
            name: "TSMC",
            latitude: 23,
            longitude: 123,
          },
          desiredDestination: {
            name: "NYCU",
            latitude: 23,
            longitude: 123,
          },
          price: 120,
          driver: {
            id: "1",
            name: "Simon",
            avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
            capacity: 4,
          },
          departAt: input.departAt,
          passengers: [],
        },
      ];
    }),

  editProfile: protectedProcedure
    .input(
      z.object({
        bio: z.string(),
      }),
    )
    .mutation(() => {
      return {};
    }),

  addToFavorite: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
      }),
    )
    .mutation(() => {
      return {};
    }),

  applyRide: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
        source: location(),
        destination: location(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const passengerRide = await ctx.passengerService.applyRide({
        passengerId: ctx.auth.userId,
        driverRideId: input.rideId,
        source: input.source,
        destination: input.destination,
      });

      const result = match(passengerRide)
        .with({ success: true }, ({ data }) => data)
        .with({ error: PassengerServiceErrors.DRIVER_NOT_FOUND }, () => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Driver not found",
          });
        })
        .with(
          { error: PassengerServiceErrors.PASSENGER_ALREADY_APPLIED },
          () => {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Already applied",
            });
          },
        )
        .with({ error: PassengerServiceErrors.DRIVER_RIDE_FULL }, () => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Ride full",
          });
        })
        .with({ error: PassengerServiceErrors.DRIVER_RIDE_NOT_OPEN }, () => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Ride not open",
          });
        })
        .with({ error: PassengerServiceErrors.DRIVER_RIDE_NOT_FOUND }, () => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Ride not found",
          });
        })
        .exhaustive();

      return result;
    }),

  leaveRide: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const passengerRide = await ctx.passengerService.leaveRide({
        passengerId: ctx.auth.userId,
        driverRideId: input.rideId,
      });

      const result = match(passengerRide)
        .with({ success: true }, ({ data }) => data)
        .with(
          { error: PassengerServiceErrors.PASSENGER_RIDE_NOT_FOUND },
          () => {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Passenger not applied to the ride",
            });
          },
        )
        .exhaustive();

      return result;
    }),

  rateRide: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
        stars: z.number().min(1).max(5),
      }),
    )
    .mutation(() => {
      return {};
    }),

  becomeDriver: protectedProcedure.mutation(() => {
    return {};
  }),
});
