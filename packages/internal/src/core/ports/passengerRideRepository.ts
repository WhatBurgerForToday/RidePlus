import { type PassengerRide } from "~/core/domain/passengerRide";

export type PassengerRideRepository = {
  create: (ride: PassengerRide) => void;
};
