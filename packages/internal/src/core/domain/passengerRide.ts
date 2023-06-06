import { type NamedLocation } from "./location";

export type PassengerRideStatus = "PENDING" | "APPROVED" | "CANCELLED";

export type PassengerRide = {
  id: string;
  isFavorite: boolean;
  driverId: string;
  passengerId: string;
  driverRideId: string;
  locations: NamedLocation[];
  status: PassengerRideStatus;
};
