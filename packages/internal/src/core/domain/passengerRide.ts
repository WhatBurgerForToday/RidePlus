import { type PassengerRideStatus } from "@prisma/client";

import { type NamedLocation } from "./location";

export type PassengerRide = {
  id: string;
  driverId: string;
  passengerId: string;
  driverRideId: string;
  locations: NamedLocation[];
  status: PassengerRideStatus;
};
