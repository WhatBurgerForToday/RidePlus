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
      .with({ error: PassengerServiceErrors.PROVIDER_USER_NOT_FOUND }, () => {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Provider user not found",
        });
      })
      .exhaustive();

    return {
      ...result,
      totalPaid: 100,
    };
  }),

  rideHistory: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().optional().default(2),
        })
        .optional()
        .default({ limit: 2 }),
    )
    .query(async ({ input, ctx }) => {
      const rideHistory = await ctx.passengerService.getRideHistory(
        ctx.auth.userId,
        input.limit,
      );

      const rider = await ctx.passengerService.getProfile(ctx.auth.userId);

      const result = match(rider)
        .with({ success: true }, ({ data }) => data)
        .with({ error: PassengerServiceErrors.PROVIDER_USER_NOT_FOUND }, () => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Provider user not found",
          });
        })
        .exhaustive();

      return rideHistory.map((ride) => {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const [source, destination] = ride.locations;
        return {
          id: ride.driverRideId,
          source: source!,
          destination: destination!,
          price: 100,
          driver: {
            id: ride.driverId,
            avatarUrl: result.avatarUrl,
          },
          departAt: ride.driverRide.departAt,
        };
      });
    }),

  favoriteRide: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().optional().default(2),
        })
        .optional()
        .default({ limit: 2 }),
    )
    .query(async ({ ctx, input }) => {
      const favoriteRides = await ctx.passengerService.getFavoriteRides(
        ctx.auth.userId,
        input.limit,
      );
      return favoriteRides.map((ride) => {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const [source, destination] = ride.locations;
        return {
          id: ride.driverRideId,
          departAt: ride.driverRide.departAt,
          source: source!,
          destination: destination!,
          price: 100,
        };
      });
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
        departAfter: z.date(),
        limit: z.number().optional().default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const rides = await ctx.passengerService.searchNearbyRides({
        source: input.source,
        destination: input.destination,
        departAfter: input.departAfter,
        limit: input.limit,
      });

      return rides.map((ride) => {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const [source, destination] = ride.locations;
        return {
          id: ride.id,
          stars: ride.driver.receivedReview.reduce(
            (acc, review) => acc + review.stars,
            0,
          ),
          source: source!,
          desiredDestination: destination!,
          price: 100,
          driver: ride.driver,
          departAt: ride.departAt,
          passengers: ride.passengers,
        };
      });
    }),

  editProfile: protectedProcedure
    .input(
      z.object({
        bio: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const passenger = await ctx.passengerService.editProfile({
        passengerId: ctx.auth.userId,
        bio: input.bio,
      });
      return passenger;
    }),

  addToFavorite: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ride = await ctx.passengerService.addRideToFavorites(
        ctx.auth.userId,
        input.rideId,
      );

      const result = match(ride)
        .with({ success: true }, ({ data }) => data)
        .with({ error: PassengerServiceErrors.DRIVER_RIDE_NOT_FOUND }, () => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Ride not found",
          });
        })
        .with(
          { error: PassengerServiceErrors.PASSENGER_RIDE_NOT_FOUND },
          () => {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Ride not found",
            });
          },
        )
        .exhaustive();

      return result;
    }),

  removeFromFavorite: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ride = await ctx.passengerService.removeRideFromFavorites(
        ctx.auth.userId,
        input.rideId,
      );

      const result = match(ride)
        .with({ success: true }, ({ data }) => data)
        .with({ error: PassengerServiceErrors.DRIVER_RIDE_NOT_FOUND }, () => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Ride not found",
          });
        })
        .with(
          { error: PassengerServiceErrors.PASSENGER_RIDE_NOT_FOUND },
          () => {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Ride not found",
            });
          },
        )
        .exhaustive();

      return result;
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
        comment: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newRating = await ctx.passengerService.rateRide({
        passengerId: ctx.auth.userId,
        driverRideId: input.rideId,
        stars: input.stars,
        comment: input.comment,
      });

      const result = match(newRating)
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

  becomeDriver: protectedProcedure
    .input(
      z.object({
        capacity: z.number().min(1).max(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const driver = await ctx.driverService.register(
        ctx.auth.userId,
        input.capacity,
      );
      return driver;
    }),
});
