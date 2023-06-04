import { type Location } from "../../core/domain/location";
import { type DriverRideRepository } from "../../core/ports/driverRideRepository";
import { type LocationRepository } from "../../core/ports/locationRepository";

type CreateDriverRideInput = {
  driverId: string;
  departAt: Date;
  locations: Location[];
};

export const createDriverService = (
  driverRideRepository: DriverRideRepository,
  locationRepository: LocationRepository,
) => {
  return {
    createDriverRide: async (input: CreateDriverRideInput) => {
      const { driverId, departAt, locations } = input;
      const namedLocation = await locationRepository.findName(locations);

      return driverRideRepository.save({
        driverId,
        departAt,
        locations: namedLocation,
      });
    },
  };
};

export type DriverService = ReturnType<typeof createDriverService>;
