import { TRPCError } from "@trpc/server";
import { match } from "ts-pattern";
import { z } from "zod";

import { DriverServiceErrors } from "@rideplus/internal";

import { location } from "../schema/location";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const driverRouter = createTRPCRouter({
  profile: protectedProcedure.query(() => {
    return {
      name: "Simon",
      avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      stars: 4,
      capacity: 3,
      rules:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
  }),

  reviews: protectedProcedure.query(() => {
    return [
      {
        id: "1",
        stars: 3,
        comment: "lorem",
      },
    ];
  }),

  approvedRider: protectedProcedure.query(() => {
    return [
      {
        departAt: new Date(),
        source: {
          latitude: 23,
          longitude: 123,
        },
        desiredDestination: {
          latitude: 23,
          longitude: 123,
        },
        price: 120,
        rider: {
          id: "1",
          name: "Simon",
          avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
        },
      },
    ];
  }),

  pendingRider: protectedProcedure.query(() => {
    return [
      {
        departAt: new Date(),
        source: {
          latitude: 23,
          longitude: 123,
        },
        desiredDestination: {
          latitude: 23,
          longitude: 123,
        },
        price: 120,
        rider: {
          id: "1",
          name: "Simon",
          avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
        },
      },
    ];
  }),

  editProfile: protectedProcedure
    .input(
      z.object({
        bio: z.string().optional(),
        rules: z.string().optional(),
        capacity: z.number().optional(),
      }),
    )
    .mutation(() => {
      return {};
    }),

  create: protectedProcedure
    .input(
      z.object({
        locations: z.array(location()),
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
});
