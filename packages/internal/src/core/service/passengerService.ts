import { error, success } from "../../types/result";
import { type Location } from "../domain/location";
import {
  type DriverRepository,
  type DriverRideRepository,
  type LocationRepository,
  type PassengerRepository,
  type PassengerRideRepository,
  type ReviewRepository,
  type UserRepository,
} from "../ports";

type PassengerServiceDeps = {
  passengerRides: PassengerRideRepository;
  passengers: PassengerRepository;
  driverRides: DriverRideRepository;
  drivers: DriverRepository;
  locations: LocationRepository;
  users: UserRepository;
  reviews: ReviewRepository;
};

type EditProfileInput = {
  passengerId: string;
  bio: string;
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

type RateRideInput = {
  driverRideId: string;
  passengerId: string;
  stars: number;
  comment: string;
};

export const PassengerServiceErrors = {
  PROVIDER_USER_NOT_FOUND: "provider user not found",
  PASSENGER_RIDE_NOT_FOUND: "passenger ride not found",
  DRIVER_RIDE_NOT_FOUND: "driver ride not found",
  DRIVER_NOT_FOUND: "driver not found",
  DRIVER_RIDE_NOT_OPEN: "driver ride not open",
  DRIVER_RIDE_FULL: "driver ride full",
  PASSENGER_ALREADY_APPLIED: "passenger already applied",
} as const;

export const createPassengerService = (deps: PassengerServiceDeps) => {
  const {
    passengerRides,
    passengers,
    driverRides,
    drivers,
    locations,
    users,
    reviews,
  } = deps;

  return {
    getProfile: async (passengerId: string) => {
      const passenger = await passengers.findOrCreate(passengerId);
      const user = await users.findById(passengerId);
      if (user == null) {
        return error(PassengerServiceErrors.PROVIDER_USER_NOT_FOUND);
      }
      return success({
        id: passenger.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        bio: passenger.bio,
      });
    },

    editProfile: async (input: EditProfileInput) => {
      const passenger = await passengers.findOrCreate(input.passengerId);

      const newPassenger = await passengers.save({
        ...passenger,
        bio: input.bio,
      });

      return newPassenger;
    },

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

    rateRide: async (input: RateRideInput) => {
      const passengerRide = await passengerRides.findByDriverRideId(
        input.driverRideId,
        input.passengerId,
      );
      if (passengerRide == null) {
        return error(PassengerServiceErrors.PASSENGER_RIDE_NOT_FOUND);
      }

      const newReview = await reviews.save({
        driverId: passengerRide.driverId,
        passengerId: passengerRide.passengerId,
        rideId: passengerRide.driverRideId,
        stars: input.stars,
        comment: input.comment,
      });

      return success(newReview);
    },
  };
};

export type PassengerService = ReturnType<typeof createPassengerService>;
