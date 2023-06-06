import {
  type PassengerRide,
  type PassengerRideStatus,
} from "../../core/domain/passengerRide";
import { type MakeOptional } from "../../types/magic";

export type SavePassengerRideInput = MakeOptional<
  PassengerRide,
  "id" | "status" | "isFavorite"
>;

type PassengerRideWithDepartAt = PassengerRide & {
  driverRide: {
    departAt: Date;
  };
};

export type PassengerRideRepository = {
  save(input: SavePassengerRideInput): Promise<PassengerRide>;
  findByDriverRideId(
    driverRideId: string,
    passengerId: string,
  ): Promise<PassengerRide | null>;
  countByDriverRideId(driverRideId: string): Promise<number>;
  findByPassengerIdWithStatus(
    passengerId: string,
    status: PassengerRideStatus,
  ): Promise<PassengerRideWithDepartAt[]>;
  findFavoritesByPassengerId(
    passengerId: string,
    limit: number,
  ): Promise<PassengerRideWithDepartAt[]>;
  findByDriverIdWithStatus(
    driverId: string,
    status: PassengerRideStatus,
  ): Promise<PassengerRideWithDepartAt[]>;
};
