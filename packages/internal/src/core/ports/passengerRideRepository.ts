import { type PassengerRide } from "~/core/domain/passengerRide";

export type CreatePassengerRideInput = Omit<PassengerRide, "id">;

export type PassengerRideRepository = {
  create: (input: CreatePassengerRideInput) => Promise<void>;
};
