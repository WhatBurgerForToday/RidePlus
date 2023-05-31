import { type PrismaClient } from "@rideplus/db";

import { type PassengerRideRepository } from "~/core/ports/passengerRideRepository";

export const createPrismaPassengerRideRepo = (
  _prisma: PrismaClient,
): PassengerRideRepository => {
  return {
    create: (_ride) => {
      throw new Error("Not implemented yet");
    },
  };
};
