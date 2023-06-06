import { type Driver } from "../domain/driver";
import { type RideReview } from "../domain/rideReview";

export type DriverRepository = {
  findById(id: string): Promise<Driver | null>;
  findReviews(driverId: string): Promise<RideReview[]>;
  save(driver: Driver): Promise<Driver>;
};
