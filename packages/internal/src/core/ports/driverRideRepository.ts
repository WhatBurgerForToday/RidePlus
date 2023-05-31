import { type DriverRide } from "~/core/domain/driverRide";

export type CreateDriverRideInput = Omit<DriverRide, "id">;

export type DriverRideRepository = {
  create: (input: CreateDriverRideInput) => Promise<void>;
};
