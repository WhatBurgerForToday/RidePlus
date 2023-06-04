import { TRPCError } from "@trpc/server";
import { z } from "zod";

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
        stars: 3,
        comment: "",
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
      try {
        const driverRide = await ctx.driverService.createDriverRide({
          driverId: ctx.auth.userId,
          locations: input.locations,
          departAt: input.departAt,
        });
        return driverRide;
      } catch (e) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not a driver yet",
        });
      }
    }),

  manageRider: protectedProcedure
    .input(
      z.object({
        rideId: z.string(),
        action: z.enum(["cancel", "deny", "approve"]),
        riderId: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      try {
        const status = input.action === "approve" ? "APPROVED" : "CANCELLED";
        return ctx.driverService.manageRider({
          driverId: ctx.auth.userId,
          rideId: input.rideId,
          riderId: input.riderId,
          status,
        });
      } catch (e) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not a driver yet",
        });
      }
    }),
});
