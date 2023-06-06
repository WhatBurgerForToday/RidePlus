import { type RideReview } from "../domain/rideReview";

export type ReviewRepository = {
  calculateDriverStars: (driverId: string) => Promise<number>;
  findByDriverId(driverId: string): Promise<RideReview[]>;
};
