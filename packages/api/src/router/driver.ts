import { TRPCError } from "@trpc/server";
import { match } from "ts-pattern";
import { z } from "zod";

import { DriverServiceErrors } from "@rideplus/internal";

import { namedLocation } from "../schema/location";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const driverRouter = createTRPCRouter({
  profile: protectedProcedure.query(async ({ ctx }) => {
    const driverProfile = await ctx.driverService.getProfile(ctx.auth.userId);

    const result = match(driverProfile)
      .with({ success: true }, ({ data }) => data)
      .with({ error: DriverServiceErrors.NOT_A_DRIVER }, () => {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not a driver yet",
        });
      })
      .with({ error: DriverServiceErrors.PROVIDER_USER_NOT_FOUND }, () => {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Provider user not found",
        });
      })
      .exhaustive();

    return result;
  }),

  reviews: protectedProcedure.query(async ({ ctx }) => {
    const reviews = await ctx.driverService.getReviews(ctx.auth.userId);

    const result = match(reviews)
      .with({ success: true }, ({ data }) => data)
      .with({ error: DriverServiceErrors.NOT_A_DRIVER }, () => {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not a driver yet",
        });
      })
      .exhaustive();

    return result;
  }),

  approvedRider: protectedProcedure.query(async ({ ctx }) => {
    const approvedRiders = await ctx.driverService.getApprovedPassengers(
      ctx.auth.userId,
    );

    const result = match(approvedRiders)
      .with({ success: true }, ({ data }) => data)
      .with({ error: DriverServiceErrors.NOT_A_DRIVER }, () => {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not a driver yet",
        });
      })
      .exhaustive();

    return result.map((rider) => {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const [source, destination] = rider.locations;
      return {
        id: rider.id,
        departAt: rider.departAt,
        source: source!,
        desiredDestination: destination!,
        price: 100,
        rider: {
          id: rider.passengerId,
          name: rider.name,
          avatarUrl: rider.avatarUrl,
        },
      };
    });
  }),

  pendingRider: protectedProcedure.query(async ({ ctx }) => {
    const pendingRiders = await ctx.driverService.getPendingPassengers(
      ctx.auth.userId,
    );

    const result = match(pendingRiders)
      .with({ success: true }, ({ data }) => data)
      .with({ error: DriverServiceErrors.NOT_A_DRIVER }, () => {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not a driver yet",
        });
      })
      .exhaustive();

    return result.map((rider) => {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */

      const [source, destination] = rider.locations;
      return {
        id: rider.id,
        departAt: rider.departAt,
        source: source!,
        desiredDestination: destination!,
        price: 100,
        rider: {
          id: rider.passengerId,
          name: rider.name,
          avatarUrl: rider.avatarUrl,
        },
      };
    });
  }),

  editProfile: protectedProcedure
    .input(
      z.object({
        bio: z.string().optional(),
        rules: z.string().optional(),
        capacity: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newDriver = await ctx.driverService.editProfile({
        driverId: ctx.auth.userId,
        bio: input.bio,
        rules: input.rules,
        capacity: input.capacity,
      });

      const result = match(newDriver)
        .with({ success: true }, ({ data }) => data)
        .with({ error: DriverServiceErrors.NOT_A_DRIVER }, () => {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not a driver yet",
          });
        })
        .exhaustive();

      return result;
    }),

  create: protectedProcedure
    .input(
      z.object({
        locations: z.array(namedLocation()),
        departAt: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const driverRide = await ctx.driverService.createDriverRide({
        driverId: ctx.auth.userId,
        locations: input.locations,
        departAt: input.departAt,
      });

      const result = match(driverRide)
        .with({ success: true }, ({ data }) => data)
        .with({ error: DriverServiceErrors.NOT_A_DRIVER }, () => {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not a driver yet",
          });
        })
        .exhaustive();
      return result;
    }),

  manageRider: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
        action: z.enum(["cancel", "deny", "approve"]),
        riderId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const status = input.action === "approve" ? "APPROVED" : "CANCELLED";
      const passengerRide = await ctx.driverService.manageRider({
        driverId: ctx.auth.userId,
        driverRideId: input.rideId,
        passengerId: input.riderId,
        status,
      });

      const result = match(passengerRide)
        .with({ success: true }, ({ data }) => data)
        .with({ error: DriverServiceErrors.NOT_A_DRIVER }, () => {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not a driver yet",
          });
        })
        .with({ error: DriverServiceErrors.DRIVER_RIDE_NOT_FOUND }, () => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Driver ride not found",
          });
        })
        .exhaustive();
      return result;
    }),

  finishRide: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const driverRide = await ctx.driverService.finishRide(
        ctx.auth.userId,
        input.rideId,
      );

      const result = match(driverRide)
        .with({ success: true }, ({ data }) => data)
        .with({ error: DriverServiceErrors.NOT_A_DRIVER }, () => {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not a driver yet",
          });
        })
        .with({ error: DriverServiceErrors.DRIVER_RIDE_NOT_FOUND }, () => {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Driver ride not found",
          });
        })
        .exhaustive();

      return result;
    }),
});
