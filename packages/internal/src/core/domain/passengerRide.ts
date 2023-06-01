import { type RideStatus } from "@prisma/client";

import { type Location } from "./location";

export type PassengerRide = {
  id: string;
  driverId: string;
  locations: Location[];
  status: RideStatus;
};
