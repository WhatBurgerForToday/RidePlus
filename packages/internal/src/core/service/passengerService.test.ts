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

  describe("applyRide", () => {
    it("should get driver ride not found error", async () => {
      mockDriverRidesRepo.findById.mockResolvedValueOnce(null);
      const result = await service.applyRide({
        driverRideId: "not-existing-id",
        passengerId: "passenger-id",
        source: {
          latitude: 0,
          longitude: 0,
        },
        destination: {
          latitude: 0,
          longitude: 0,
        },
      });

      expect(result).toEqual(
        error(PassengerServiceErrors.DRIVER_RIDE_NOT_FOUND),
      );
    });

    const date = new Date();
    it("should get driver ride not open error", async () => {
      mockDriverRepo.findById.mockResolvedValueOnce({
        id: "driver-id",
        capacity: 4,
        bio: "bio",
        rides: [
          {
            id: "driver-ride-id",
            driverId: "driver-id",
            status: "CLOSED",
            departAt: date,
            locations: [
              {
                latitude: 0,
                longitude: 0,
                name: "source",
              },
              {
                latitude: 0,
                longitude: 0.1,
                name: "destination",
              },
            ],
          },
        ],
        rules: "rules",
      });
      mockDriverRidesRepo.findById.mockResolvedValueOnce({
        id: "driver-ride-id",
        driverId: "driver-id",
        status: "CLOSED",
        departAt: date,
        locations: [
          {
            latitude: 0,
            longitude: 0,
            name: "source",
          },
          {
            latitude: 0,
            longitude: 0.1,
            name: "destination",
          },
        ],
      });

      const result = await service.applyRide({
        driverRideId: "driver-ride-id",
        passengerId: "passenger-id",
        source: {
          latitude: 0,
          longitude: 0,
        },
        destination: {
          latitude: 0,
          longitude: 0.1,
        },
      });

      expect(result).toEqual(
        error(PassengerServiceErrors.DRIVER_RIDE_NOT_OPEN),
      );
    });
  });
});
