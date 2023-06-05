import { z } from "zod";

import { location } from "../schema/location";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const riderRouter = createTRPCRouter({
  profile: protectedProcedure.query(() => {
    return {
      name: "Simon",
      avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      totalPaid: 120,
    };
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

  approvedRide: protectedProcedure.query(() => {
    return [
      {
        id: "1",
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
        driver: {
          id: "1",
          name: "Simon",
          avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
        },
      },
      {
        id: "2",
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
        driver: {
          id: "1",
          name: "Simon",
          avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
        },
      },
    ];
  }),

  pendingRide: protectedProcedure.query(() => {
    return [
      {
        id: "1",
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
        driver: {
          id: "1",
          name: "Simon",
          avatarUrl: "https://hackmd.io/_uploads/Byne59oS2.png",
        },
      },
    ];
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

  manageRegistration: protectedProcedure
    .input(
      z.object({
        action: z.enum(["apply", "leave", "cancel"]),
        rideId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const status = input.action === "apply" ? "PENDING" : "CANCELLED";
      const driverRide = await ctx.driverService.getDriverRideById(
        input.rideId,
      );
      if (driverRide === null) {
        throw new Error("DriverRide not found");
      }

      if (driverRide.status !== "OPEN") {
        throw new Error("DriverRide is not open");
      }

      return ctx.passengerService.manageRegistration({
        passengerId: ctx.auth.userId,
        driverRideId: input.rideId,
        status,
      });
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
