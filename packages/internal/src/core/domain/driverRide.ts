import { type NamedLocation } from "./location";

export type DriverRideStatus = "OPEN" | "CLOSED";

export type DriverRide = {
  id: string;
  driverId: string;
  locations: NamedLocation[];
  status: DriverRideStatus;
  departAt: Date;
};
