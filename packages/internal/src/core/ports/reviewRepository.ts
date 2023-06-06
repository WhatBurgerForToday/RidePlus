import { type MakeOptional } from "../../types/magic";
import { type RideReview } from "../domain/rideReview";

type SaveReviewInput = MakeOptional<RideReview, "id">;

export type ReviewRepository = {
  calculateDriverStars: (driverId: string) => Promise<number>;
  findByDriverId(driverId: string): Promise<RideReview[]>;
  save(review: SaveReviewInput): Promise<RideReview>;
};
