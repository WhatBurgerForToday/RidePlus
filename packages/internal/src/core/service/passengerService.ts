import { error, success } from "../../types/result";
import { type Location } from "../domain/location";
import {
  type DriverRepository,
  type DriverRideRepository,
  type LocationRepository,
  type PassengerRideRepository,
  type UserRepository,
} from "../ports";

type PassengerServiceDeps = {
  passengerRides: PassengerRideRepository;
  driverRides: DriverRideRepository;
  drivers: DriverRepository;
  locations: LocationRepository;
  users: UserRepository;
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
  const { passengerRides, driverRides, drivers, locations, users } = deps;

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

    getApprovedPassengerRides: async (passengerId: string) => {
      const approvedPassengerRides =
        await passengerRides.findByPassengerIdWithStatus(
          passengerId,
          "APPROVED",
        );

      const driverIds = approvedPassengerRides.map(
        (passengerRide) => passengerRide.driverId,
      );

      const driverMap = await users.findManyByIds(driverIds);

      return approvedPassengerRides.map((passengerRide) => {
        return {
          ...passengerRide,
          driver: driverMap.get(passengerRide.driverId),
        };
      });
    },

    getPendingPassengerRides: async (passengerId: string) => {
      const pendingPassengerRides =
        await passengerRides.findByPassengerIdWithStatus(
          passengerId,
          "PENDING",
        );

      const driverIds = pendingPassengerRides.map(
        (passengerRide) => passengerRide.driverId,
      );

      const driverMap = await users.findManyByIds(driverIds);

      return pendingPassengerRides.map((passengerRide) => {
        return {
          ...passengerRide,
          driver: driverMap.get(passengerRide.driverId),
        };
      });
    },

    getFavoriteRides: async (passengerId: string, limit: number) => {
      const favoriteRides = await passengerRides.findFavoritesByPassengerId(
        passengerId,
        limit,
      );
      return favoriteRides;
    },

    addRideToFavorites: async (passengerId: string, driverRideId: string) => {
      const driverRide = await driverRides.findById(driverRideId);
      if (driverRide == null) {
        return error(PassengerServiceErrors.DRIVER_RIDE_NOT_FOUND);
      }

      const passengerRide = await passengerRides.findByDriverRideId(
        driverRideId,
        passengerId,
      );
      if (passengerRide == null) {
        return error(PassengerServiceErrors.PASSENGER_RIDE_NOT_FOUND);
      }

      const favoriteRide = await passengerRides.save({
        ...passengerRide,
        isFavorite: true,
      });

      return success(favoriteRide);
    },

    removeRideFromFavorites: async (
      passengerId: string,
      driverRideId: string,
    ) => {
      const driverRide = await driverRides.findById(driverRideId);
      if (driverRide == null) {
        return error(PassengerServiceErrors.DRIVER_RIDE_NOT_FOUND);
      }

      const passengerRide = await passengerRides.findByDriverRideId(
        driverRideId,
        passengerId,
      );
      if (passengerRide == null) {
        return error(PassengerServiceErrors.PASSENGER_RIDE_NOT_FOUND);
      }

      const favoriteRide = await passengerRides.save({
        ...passengerRide,
        isFavorite: false,
      });

      return success(favoriteRide);
    },
  };
};

export type PassengerService = ReturnType<typeof createPassengerService>;
