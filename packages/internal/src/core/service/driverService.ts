import { type PassengerRideStatus } from "@prisma/client";

import { type Location } from "../../core/domain/location";
import {
  type DriverRepository,
  type DriverRideRepository,
  type LocationRepository,
  type PassengerRideRepository,
} from "../ports";

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

export const createDriverService = (
  driverRideRepository: DriverRideRepository,
  driverRepository: DriverRepository,
  passengerRideRepository: PassengerRideRepository,
  locationRepository: LocationRepository,
) => {
  return {
    createDriverRide: async (input: CreateDriverRideInput) => {
      const { driverId, departAt, locations } = input;
      const namedLocation = await locationRepository.findName(locations);

      const driver = await driverRepository.findById(driverId);

      if (driver === null) {
        throw new Error("Driver not found");
      }

      return driverRideRepository.save({
        driverId,
        departAt,
        locations: namedLocation,
      });
    },

    manageRider: async (input: ManagePassengerInput) => {
      const driver = await driverRepository.findById(input.driverId);

      if (driver === null) {
        throw new Error("Driver not found");
      }

      const driverRide = await passengerRideRepository.findByDriverRideId(
        input.driverRideId,
        input.passengerId,
      );

      if (driverRide === null) {
        throw new Error("DriverRide not found");
      }

      return passengerRideRepository.save({
        id: driverRide.id,
        status: input.status,
        locations: driverRide.locations,
        driverId: driverRide.driverId,
        passengerId: driverRide.passengerId,
        driverRideId: driverRide.driverRideId,
      });
    },
  };
};

export type DriverService = ReturnType<typeof createDriverService>;
