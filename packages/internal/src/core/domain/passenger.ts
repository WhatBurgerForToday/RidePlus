import { type PassengerRide } from "./passengerRide";

export type Passenger = {
  id: string;
  bio: string;
  rides: PassengerRide[];
};
