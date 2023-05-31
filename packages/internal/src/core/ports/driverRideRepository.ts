import { type DriverRide } from "~/core/domain/driverRide";

export type DriverRideRepository = {
  create: (ride: DriverRide) => void;
};
