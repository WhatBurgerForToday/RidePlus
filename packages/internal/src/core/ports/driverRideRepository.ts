import {
  type DriverRide,
  type DriverRideStatus,
} from "../../core/domain/driverRide";
import { type Location, type NamedLocation } from "../domain/location";
import { type RideReview } from "../domain/rideReview";

export type SaveDriverRideInput = {
  id?: string;
  driverId: string;
  locations: NamedLocation[];
  departAt: Date;
  status?: DriverRideStatus;
};

export type FindByNearbyLocationsInput = {
  source: Location;
  destination: Location;
  departAfter: Date;
  limit: number;
};

type DriverRideWithDriver = DriverRide & {
  driver: {
    id: string;
    capacity: number;
    receivedReview: RideReview[];
  };
  passengers: {
    id: string;
  }[];
};

export type DriverRideRepository = {
  save: (input: SaveDriverRideInput) => Promise<DriverRide>;
  findById: (id: string) => Promise<DriverRide | null>;
  findByNearbyLocations: (
    input: FindByNearbyLocationsInput,
  ) => Promise<DriverRideWithDriver[]>;
};
