import { error, success } from "../../types/result";
import { type Location } from "../domain/location";
import {
  type DriverRepository,
  type DriverRideRepository,
  type LocationRepository,
  type PassengerRideRepository,
} from "../ports";

type PassengerServiceDeps = {
  passengerRides: PassengerRideRepository;
  driverRides: DriverRideRepository;
  drivers: DriverRepository;
  locations: LocationRepository;
};

type ApplyRideInput = {
  driverRideId: string;
  passengerId: string;
  source: Location;
  destination: Location;
};

type LeaveRideInput = {
  driverRideId: string;
  passengerId: string;
};

export const PassengerServiceErrors = {
  PASSENGER_RIDE_NOT_FOUND: "passenger ride not found",
  DRIVER_RIDE_NOT_FOUND: "driver ride not found",
  DRIVER_NOT_FOUND: "driver not found",
  DRIVER_RIDE_NOT_OPEN: "driver ride not open",
  DRIVER_RIDE_FULL: "driver ride full",
  PASSENGER_ALREADY_APPLIED: "passenger already applied",
} as const;

export const createPassengerService = (deps: PassengerServiceDeps) => {
  const { passengerRides, driverRides, drivers, locations } = deps;

  return {
    applyRide: async (input: ApplyRideInput) => {
      const driverRide = await driverRides.findById(input.driverRideId);
      if (driverRide == null) {
        return error(PassengerServiceErrors.DRIVER_RIDE_NOT_FOUND);
      }

      if (driverRide.status !== "OPEN") {
        return error(PassengerServiceErrors.DRIVER_RIDE_NOT_OPEN);
      }

      const driver = await drivers.findById(driverRide.driverId);
      if (driver == null) {
        return error(PassengerServiceErrors.DRIVER_NOT_FOUND);
      }

      const passengerCount = await passengerRides.countByDriverRideId(
        input.driverRideId,
      );
      if (passengerCount + 1 > driver.capacity) {
        return error(PassengerServiceErrors.DRIVER_RIDE_FULL);
      }

      const namedLocations = await locations.findName([
        input.source,
        input.destination,
      ]);

      try {
        const passengerRide = await passengerRides.save({
          driverId: driver.id,
          passengerId: input.passengerId,
          driverRideId: input.driverRideId,
          locations: namedLocations,
        });

        return success(passengerRide);
      } catch (e) {
        return error(PassengerServiceErrors.PASSENGER_ALREADY_APPLIED);
      }
    },

    leaveRide: async (input: LeaveRideInput) => {
      const passengerRide = await passengerRides.findByDriverRideId(
        input.driverRideId,
        input.passengerId,
      );
      if (passengerRide == null) {
        return error(PassengerServiceErrors.PASSENGER_RIDE_NOT_FOUND);
      }

      const updatedPassengerRide = await passengerRides.save({
        ...passengerRide,
        status: "CANCELLED",
      });

      return success(updatedPassengerRide);
    },
  };
};

export type PassengerService = ReturnType<typeof createPassengerService>;
