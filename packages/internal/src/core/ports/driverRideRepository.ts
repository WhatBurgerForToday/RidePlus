import { type DriverRide } from "../../core/domain/driverRide";
import { type MakeOptional } from "../../types/magic";
import { type Location } from "../domain/location";
import { type RideReview } from "../domain/rideReview";

export type SaveDriverRideInput = MakeOptional<DriverRide, "id" | "status">;

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
