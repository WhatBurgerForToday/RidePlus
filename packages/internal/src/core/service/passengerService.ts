import { type PassengerRideStatus } from "@prisma/client";

import {
  type DriverRepository,
  type DriverRideRepository,
  type PassengerRideRepository,
} from "../ports";

type ManageRegistrationInput = {
  driverRideId: string;
  passengerId: string;
  status: PassengerRideStatus;
};

export const createPassengerService = (
  passengerRideRepository: PassengerRideRepository,
  driverRideRepository: DriverRideRepository,
  driverRepository: DriverRepository,
) => {
  return {
    manageRegistration: async (input: ManageRegistrationInput) => {
      const passengerRide = await passengerRideRepository.findByDriverRideId(
        input.driverRideId,
        input.passengerId,
      );

      if (passengerRide === null) {
        throw new Error("PassengerRide not found");
      }

      const driverRide = await driverRideRepository.findById(
        input.driverRideId,
      );

      if (driverRide === null) {
        throw new Error("DriverRide not found");
      }

      if (driverRide.status !== "OPEN") {
        throw new Error("DriverRide is not open");
      }

      const driver = await driverRepository.findById(driverRide.driverId);
      if (driver === null) {
        throw new Error("Driver not found");
      }

      const passengerCount = await passengerRideRepository.countByDriverRideId(
        driverRide.id,
      );

      if (driver.capacity <= passengerCount) {
        throw new Error("DriverRide is full");
      }

      const newPassengerRide = await passengerRideRepository.save({
        ...passengerRide,
        status: input.status,
      });

      return newPassengerRide;
    },
  };
};

export type PassengerService = ReturnType<typeof createPassengerService>;
