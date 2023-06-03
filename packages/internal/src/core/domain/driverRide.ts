import { type DriverRideStatus } from "@prisma/client";

import { type NamedLocation } from "./location";

export type DriverRide = {
  id: string;
  driverId: string;
  locations: NamedLocation[];
  status: DriverRideStatus;
  departAt: Date;
};
