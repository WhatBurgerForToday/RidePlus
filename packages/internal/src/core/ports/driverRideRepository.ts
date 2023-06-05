import { type DriverRide } from "../../core/domain/driverRide";
import { type MakeOptional } from "../../types/magic";

export type SaveDriverRideInput = MakeOptional<DriverRide, "id" | "status">;

export type DriverRideRepository = {
  save: (input: SaveDriverRideInput) => Promise<DriverRide>;
  findById: (id: string) => Promise<DriverRide | null>;
};
