import { type Driver } from "../domain/driver";

export type DriverRepository = {
  findById(id: string): Promise<Driver | null>;
  findReviews(driverId: string): Promise<RideReview[]>;
  save(driver: Driver): Promise<Driver>;
};
