import { type PassengerRideStatus } from "@prisma/client";

import { error, success } from "../../types/result";
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

export const PassengerServiceErrors = {
  PASSENGER_RIDE_NOT_FOUND: "passenger ride not found",
  DRIVER_RIDE_NOT_FOUND: "driver ride not found",
  DRIVER_NOT_FOUND: "driver not found",
  DRIVER_RIDE_NOT_OPEN: "driver ride not open",
  DRIVER_RIDE_FULL: "driver ride full",
} as const;

export const createPassengerService = (
  passengerRides: PassengerRideRepository,
  driverRides: DriverRideRepository,
  drivers: DriverRepository,
) => {
  return {
    manageRegistration: async (input: ManageRegistrationInput) => {
      const passengerRide = await passengerRides.findByDriverRideId(
        input.driverRideId,
        input.passengerId,
      );

      if (passengerRide === null) {
        return error(PassengerServiceErrors.PASSENGER_RIDE_NOT_FOUND);
      }

      const driverRide = await driverRides.findById(input.driverRideId);

      if (driverRide === null) {
        return error(PassengerServiceErrors.DRIVER_RIDE_NOT_FOUND);
      }

      if (driverRide.status !== "OPEN") {
        return error(PassengerServiceErrors.DRIVER_RIDE_NOT_OPEN);
      }

      const driver = await drivers.findById(driverRide.driverId);
      if (driver === null) {
        return error(PassengerServiceErrors.DRIVER_NOT_FOUND);
      }

      const passengerCount = await passengerRides.countByDriverRideId(
        driverRide.id,
      );

      if (driver.capacity <= passengerCount) {
        return error(PassengerServiceErrors.DRIVER_RIDE_FULL);
      }

      const newPassengerRide = await passengerRides.save({
        ...passengerRide,
        status: input.status,
      });

      return success(newPassengerRide);
    },
  };
};

export type PassengerService = ReturnType<typeof createPassengerService>;
