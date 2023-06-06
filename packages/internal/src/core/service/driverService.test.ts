import { beforeEach, describe, expect, it, vi } from "vitest";

import { error, success } from "../../types/result";
import {
  type DriverRepository,
  type DriverRideRepository,
  type LocationRepository,
  type PassengerRideRepository,
  type ReviewRepository,
  type UserRepository,
} from "../ports";
import { DriverServiceErrors, createDriverService } from "./driverService";

const mockDriverRepo = {
  save: vi.fn(),
  findById: vi.fn(),
} satisfies DriverRepository;

const mockDriverRidesRepo = {
  findById: vi.fn(),
  save: vi.fn(),
} satisfies DriverRideRepository;

const mockPassengerRideRepo = {
  save: vi.fn(),
  findByDriverRideId: vi.fn(),
  countByDriverRideId: vi.fn(),
  findByPassengerIdWithStatus: vi.fn(),
  findFavoritesByPassengerId: vi.fn(),
  findByDriverIdWithStatus: vi.fn(),
} satisfies PassengerRideRepository;

const mockLocationRepo = {
  findName: vi.fn(),
} satisfies LocationRepository;

const mockUserRepo = {
  findById: vi.fn(),
  findManyByIds: vi.fn(),
} satisfies UserRepository;

const mockReviewRepo = {
  calculateDriverStars: vi.fn(),
  findByDriverId: vi.fn(),
  save: vi.fn(),
} satisfies ReviewRepository;

const service = createDriverService({
  drivers: mockDriverRepo,
  driverRides: mockDriverRidesRepo,
  passengerRides: mockPassengerRideRepo,
  locations: mockLocationRepo,
  users: mockUserRepo,
  reviews: mockReviewRepo,
});

describe("driverService", () => {
  beforeEach(() => {
    mockDriverRepo.save.mockReset();
    mockDriverRepo.findById.mockReset();
    mockDriverRidesRepo.findById.mockReset();
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
    it("should get not a driver error", async () => {
      mockDriverRepo.findById.mockResolvedValueOnce(null);

      const profile = await service.getProfile("not-existing-id");
      expect(profile).toEqual(error(DriverServiceErrors.NOT_A_DRIVER));
    });

    it("should get provider user not found error", async () => {
      mockDriverRepo.findById.mockResolvedValueOnce({
        id: "driver-id",
        capacity: 4,
        bio: "bio",
        rules: "rules",
        rides: [],
      });
      mockUserRepo.findById.mockResolvedValueOnce(null);

      const profile = await service.getProfile("driver-id");
      expect(profile).toEqual(
        error(DriverServiceErrors.PROVIDER_USER_NOT_FOUND),
      );
    });

    it("should get driver profile", async () => {
      mockDriverRepo.findById.mockResolvedValueOnce({
        id: "driver-id",
        capacity: 4,
        bio: "bio",
        rules: "rules",
        rides: [],
      });
      mockUserRepo.findById.mockResolvedValueOnce({
        id: "driver-id",
        name: "name",
        avatarUrl: "avatar-url",
      });
      mockReviewRepo.calculateDriverStars.mockResolvedValueOnce(4);

      const profile = await service.getProfile("driver-id");
      expect(profile).toEqual(
        success({
          id: "driver-id",
          capacity: 4,
          bio: "bio",
          rules: "rules",
          name: "name",
          avatarUrl: "avatar-url",
          stars: 4,
        }),
      );
    });
  });
});
