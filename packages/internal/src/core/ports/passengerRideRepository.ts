import { type PassengerRide } from "../../core/domain/passengerRide";
import { type MakeOptional } from "../../types/magic";

export type SavePassengerRideInput = MakeOptional<
  PassengerRide,
  "id" | "status"
>;

export type PassengerRideRepository = {
  save(input: SavePassengerRideInput): Promise<PassengerRide>;
  findByDriverRideId(
    driverRideId: string,
    passengerId: string,
  ): Promise<PassengerRide | null>;
};
