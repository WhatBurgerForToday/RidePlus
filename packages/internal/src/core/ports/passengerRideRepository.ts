import { type PassengerRide } from "~/core/domain/passengerRide";
import { type Expand } from "~/types/magic";

export type SaveInput<T extends { id: unknown }> = Expand<
  Omit<T, "id"> & {
    id?: T["id"];
  }
>;

export type CreatePassengerRideInput = SaveInput<PassengerRide>;

export type PassengerRideRepository = {
  save(input: SaveInput<PassengerRide>): Promise<PassengerRide>;
};
