import { type DriverRide } from "~/core/domain/driverRide";
import { type SaveInput } from "./passengerRideRepository";

export type CreateDriverRideInput = SaveInput<DriverRide>;

export type DriverRideRepository = {
  save: (input: CreateDriverRideInput) => Promise<DriverRide>;
};
