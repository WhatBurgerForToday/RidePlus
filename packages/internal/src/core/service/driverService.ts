import { type PassengerRideStatus } from "@prisma/client";

import { type NamedLocation } from "../../core/domain/location";
import { error, success } from "../../types/result";
import {
  type DriverRepository,
  type DriverRideRepository,
  type LocationRepository,
  type PassengerRideRepository,
  type ReviewRepository,
  type UserRepository,
} from "../ports";

type DriverServiceDeps = {
  driverRides: DriverRideRepository;
  drivers: DriverRepository;
  passengerRides: PassengerRideRepository;
  locations: LocationRepository;
  users: UserRepository;
  reviews: ReviewRepository;
};

type EditProfileInput = {
  driverId: string;
  bio?: string;
  rules?: string;
  capacity?: number;
};

type CreateDriverRideInput = {
  driverId: string;
  departAt: Date;
  locations: NamedLocation[];
};

type ManagePassengerInput = {
  driverId: string;
  passengerId: string;
  driverRideId: string;
  status: PassengerRideStatus;
};

export const DriverServiceErrors = {
  PROVIDER_USER_NOT_FOUND: "provider user not found",
  NOT_A_DRIVER: "not a driver",
  DRIVER_RIDE_NOT_FOUND: "driver ride not found",
} as const;

export const createDriverService = (deps: DriverServiceDeps) => {
  const { driverRides, drivers, passengerRides, locations, users, reviews } =
    deps;

  return {
    getProfile: async (driverId: string) => {
      const driver = await drivers.findById(driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }

      const user = await users.findById(driverId);
      if (user == null) {
        return error(DriverServiceErrors.PROVIDER_USER_NOT_FOUND);
      }

      const stars = await reviews.calculateDriverStars(driverId);

      return success({
        id: driver.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        bio: driver.bio,
        rules: driver.rules,
        capacity: driver.capacity,
        stars,
      });
    },

    editProfile: async (input: EditProfileInput) => {
      const driver = await drivers.findById(input.driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }

      const newDriver = await drivers.save({
        id: driver.id,
        bio: input.bio ?? driver.bio,
        rules: input.rules ?? driver.rules,
        capacity: input.capacity ?? driver.capacity,
        rides: driver.rides,
      });

      return success(newDriver);
    },

    createDriverRide: async (input: CreateDriverRideInput) => {
      const driver = drivers.findById(input.driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }
      const newDriverRide = await driverRides.save({
        driverId: input.driverId,
        departAt: input.departAt,
        locations: input.locations,
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
      const receivedReviews = await reviews.findByDriverId(driverId);
      return success(receivedReviews);
    },

    getDriverRideById: async (id: string) => {
      const driverRide = await driverRides.findById(id);

      if (driverRide === null) {
        throw new Error("DriverRide not found");
      }

      return driverRide;
    },

    register: async (id: string, capacity: number) => {
      const driver = await drivers.findById(id);
      if (driver != null) {
        return driver;
      }

      const newDriver = await drivers.save({
        id,
        capacity,
        rides: [],
        bio: "",
        rules: "",
      });

      return newDriver;
    },

    getApprovedPassengers: async (driverId: string) => {
      const driver = await drivers.findById(driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }

      const approvedPassengers = await passengerRides.findByDriverIdWithStatus(
        driverId,
        "APPROVED",
      );

      const riderIds = approvedPassengers.map(
        (passengerRide) => passengerRide.passengerId,
      );

      const passengerMap = await users.findManyByIds(riderIds);

      const approvedPassengersInfo = approvedPassengers.map(
        (passengerRide) => ({
          id: passengerRide.id,
          passengerId: passengerRide.passengerId,
          locations: passengerRide.locations,
          departAt: passengerRide.driverRide.departAt,
          name:
            passengerMap.get(passengerRide.passengerId)?.name ?? "Anonymous",
          avatarUrl:
            passengerMap.get(passengerRide.passengerId)?.avatarUrl ?? "",
        }),
      );

      return success(approvedPassengersInfo);
    },

    getPendingPassengers: async (driverId: string) => {
      const driver = await drivers.findById(driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }

      const pendingPassengers = await passengerRides.findByDriverIdWithStatus(
        driverId,
        "PENDING",
      );

      const riderIds = pendingPassengers.map(
        (passengerRide) => passengerRide.passengerId,
      );

      const passengerMap = await users.findManyByIds(riderIds);

      const pendingPassengersInfo = pendingPassengers.map((passengerRide) => ({
        id: passengerRide.id,
        passengerId: passengerRide.passengerId,
        locations: passengerRide.locations,
        departAt: passengerRide.driverRide.departAt,
        name: passengerMap.get(passengerRide.passengerId)?.name ?? "Anonymous",
        avatarUrl: passengerMap.get(passengerRide.passengerId)?.avatarUrl ?? "",
      }));

      return success(pendingPassengersInfo);
    },

    finishRide: async (driverId: string, driverRideId: string) => {
      const driver = await drivers.findById(driverId);
      if (driver == null) {
        return error(DriverServiceErrors.NOT_A_DRIVER);
      }

      const driverRide = await driverRides.findById(driverRideId);
      if (driverRide == null) {
        return error(DriverServiceErrors.DRIVER_RIDE_NOT_FOUND);
      }

      const finishedDriverRide = await driverRides.save({
        id: driverRide.id,
        departAt: driverRide.departAt,
        locations: driverRide.locations,
        driverId: driverRide.driverId,
        status: "CLOSED",
      });

      return success(finishedDriverRide);
    },
  };
};

export type DriverService = ReturnType<typeof createDriverService>;
