import { type Location } from "../../core/domain/location";
import { type DriverRideRepository } from "../../core/ports/driverRideRepository";
import { type LocationRepository } from "../../core/ports/locationRepository";

type CreateDriverRideInput = {
  driverId: string;
  departAt: Date;
  locations: Location[];
};

type ManageRiderInput = {
  driverId: string;
  riderId: string;
  rideId: string;
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

    manageRider: async (input: ManageRiderInput) => {
      const driver = await driverRepository.findById(input.driverId);

      if (driver === null) {
        throw new Error("Driver not found");
      }

      const driverRide = await passengerRideRepository.findByDriverRideId(
        input.rideId,
      );

      if (driverRide === null) {
        throw new Error("DriverRide not found");
      }

      if (driverRide.passengerId !== input.riderId) {
        throw new Error("Wrong Rider is found");
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
