import { beforeEach, describe, expect, it } from "vitest";

import {
  mockDriverRepo,
  mockDriverRidesRepo,
  mockLocationRepo,
  mockPassengerRepo,
  mockPassengerRideRepo,
  mockReviewRepo,
  mockUserRepo,
} from "../../repositories/mockRepositories";
import { error, success } from "../../types/result";
import {
  PassengerServiceErrors,
  createPassengerService,
} from "./passengerService";

const service = createPassengerService({
  drivers: mockDriverRepo,
  driverRides: mockDriverRidesRepo,
  passengerRides: mockPassengerRideRepo,
  locations: mockLocationRepo,
  users: mockUserRepo,
  reviews: mockReviewRepo,
  passengers: mockPassengerRepo,
});

describe("passengerService", () => {
  beforeEach(() => {
    mockDriverRepo.save.mockReset();
    mockDriverRepo.findById.mockReset();
    mockDriverRidesRepo.findById.mockReset();
    mockPassengerRepo.save.mockReset();
    mockPassengerRepo.findOrCreate.mockReset();
    mockDriverRidesRepo.save.mockReset();
    mockPassengerRideRepo.save.mockReset();
    mockPassengerRideRepo.findByDriverRideId.mockReset();
    mockPassengerRideRepo.countByDriverRideId.mockReset();
    mockPassengerRideRepo.findByPassengerIdWithStatus.mockReset();
    mockPassengerRideRepo.findFavoritesByPassengerId.mockReset();
    mockPassengerRideRepo.findByDriverIdWithStatus.mockReset();
    mockLocationRepo.findName.mockReset();
    mockUserRepo.findById.mockReset();
    mockUserRepo.findManyByIds.mockReset();
    mockReviewRepo.calculateDriverStars.mockReset();
    mockReviewRepo.findByDriverId.mockReset();
    mockReviewRepo.save.mockReset();
  });

  describe("getProfile", () => {
    it("should get provider user not found error", async () => {
      mockUserRepo.findById.mockResolvedValueOnce(null);
      const profile = await service.getProfile("not-existing-id");
      expect(profile).toEqual(
        error(PassengerServiceErrors.PROVIDER_USER_NOT_FOUND),
      );
    });

    it("should get profile", async () => {
      mockPassengerRepo.findOrCreate.mockResolvedValueOnce({
        id: "passenger-id",
        bio: "bio",
        rides: [],
      });
      mockUserRepo.findById.mockResolvedValueOnce({
        id: "passenger-id",
        name: "name",
        avatarUrl: "avatar-url",
      });
      const profile = await service.getProfile("passenger-id");
      expect(profile).toEqual(
        success({
          id: "passenger-id",
          name: "name",
          avatarUrl: "avatar-url",
          bio: "bio",
        }),
      );
    });
  });
});
