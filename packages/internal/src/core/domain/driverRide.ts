import { type NamedLocationWithId } from "./location";

export type DriverRideStatus = "OPEN" | "CLOSED";

export type DriverRide = {
  id: string;
  driverId: string;
  locations: NamedLocationWithId[];
  status: DriverRideStatus;
  departAt: Date;
};
