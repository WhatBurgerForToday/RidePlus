import { type PassengerRideStatus } from "@prisma/client";

import { type Location } from "../../core/domain/location";
import { error, success } from "../../types/result";
import {
  type DriverRepository,
  type DriverRideRepository,
  type LocationRepository,
  type PassengerRideRepository,
} from "../ports";

type DriverServiceDeps = {
  driverRides: DriverRideRepository;
  drivers: DriverRepository;
  passengerRides: PassengerRideRepository;
  locations: LocationRepository;
};

type CreateDriverRideInput = {
  driverId: string;
  departAt: Date;
  locations: Location[];
};

type ManagePassengerInput = {
  driverId: string;
  passengerId: string;
  driverRideId: string;
  status: PassengerRideStatus;
};

export const DriverServiceErrors = {
  NOT_A_DRIVER: "not a driver",
  DRIVER_RIDE_NOT_FOUND: "driver ride not found",
} as const;

export const createDriverService = (deps: DriverServiceDeps) => {
  const { driverRides, drivers, passengerRides, locations } = deps;

  return {
    createDriverRide: async (input: CreateDriverRideInput) => {
      const driver = drivers.findById(input.driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }

      const namedLocation = await locations.findName(input.locations);
      const newDriverRide = await driverRides.save({
        driverId: input.driverId,
        departAt: input.departAt,
        locations: namedLocation,
      });
      return success(newDriverRide);
    },

    manageRider: async (input: ManagePassengerInput) => {
      const driver = await drivers.findById(input.driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }

      const driverRide = await passengerRides.findByDriverRideId(
        input.driverRideId,
        input.passengerId,
      );
      if (driverRide == null) {
        return error(DriverServiceErrors.DRIVER_RIDE_NOT_FOUND);
      }

      const newPassengerRide = await passengerRides.save({
        id: driverRide.id,
        status: input.status,
        locations: driverRide.locations,
        driverId: driverRide.driverId,
        passengerId: driverRide.passengerId,
        driverRideId: driverRide.driverRideId,
      });

      return success(newPassengerRide);
    },

    getReviews: async (driverId: string) => {
      const driver = await drivers.findById(driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }
      const reviews = await drivers.findReviews(driverId);
      return success(reviews);
    },

    getDriverRideById: async (id: string) => {
      const driverRide = await driverRides.findById(id);

      if (driverRide === null) {
        throw new Error("DriverRide not found");
      }

      return driverRide;
    },
  };
};

export type DriverService = ReturnType<typeof createDriverService>;
