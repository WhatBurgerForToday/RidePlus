import { type DriverRideStatus } from "@prisma/client";

import { type Location } from "./location";

export type DriverRide = {
  id: string;
  driverId: string;
  locations: Location[];
  status: DriverRideStatus;
};
