import { type PassengerRideStatus } from "@prisma/client";

import { type Location } from "./location";

export type PassengerRide = {
  id: string;
  driverId: string;
  passengerId: string;
  driverRideId: string;
  locations: Location[];
  status: PassengerRideStatus;
};
