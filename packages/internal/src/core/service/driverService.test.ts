import { beforeEach, describe, expect, it } from "vitest";

import {
  mockDriverRepo,
  mockDriverRidesRepo,
  mockLocationRepo,
  mockPassengerRideRepo,
  mockReviewRepo,
  mockUserRepo,
} from "../../repositories/mockRepositories";
import { error, success } from "../../types/result";
import {
  DriverServiceErrors,
  LocationServiceErrors,
  createDriverService,
} from "./driverService";

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

  describe("createDriverRide", () => {
    it("should get not a driver error", async () => {
      mockDriverRepo.findById.mockResolvedValueOnce(null);

      const ride = await service.createDriverRide({
        driverId: "not-driver-id",
        locations: [
          {
            name: "source",
            latitude: 0,
            longitude: 0,
          },
          {
            name: "destination",
            latitude: 0.001,
            longitude: 0.001,
          },
        ],
        departAt: new Date(),
      });

      expect(ride).toEqual(error(DriverServiceErrors.NOT_A_DRIVER));
    });

    it("should get location not provided error", async () => {
      mockDriverRepo.findById.mockResolvedValueOnce({
        id: "driver-id",
        capacity: 4,
        bio: "bio",
        rules: "rules",
        rides: [],
      });
      const ride = await service.createDriverRide({
        driverId: "driver-id",
        locations: [],
        departAt: new Date(),
      });

      expect(ride).toEqual(error(LocationServiceErrors.LOCATION_NOT_PROVIDED));
    });

    const date = new Date();

    it("should create driver ride", async () => {
      mockDriverRepo.findById.mockResolvedValueOnce({
        id: "driver-id",
        capacity: 4,
        bio: "bio",
        rules: "rules",
        rides: [],
      });
      mockDriverRidesRepo.save.mockResolvedValueOnce({
        id: "driver-ride-id",
        driverId: "driver-id",
        departAt: date,
        status: "OPEN",
        locations: [
          {
            name: "source",
            latitude: 0,
            longitude: 0,
          },
          {
            name: "destination",
            latitude: 0.001,
            longitude: 0.001,
          },
        ],
      });

      const ride = await service.createDriverRide({
        driverId: "driver-id",
        locations: [
          {
            name: "source",
            latitude: 0,
            longitude: 0,
          },
          {
            name: "destination",
            latitude: 0.001,
            longitude: 0.001,
          },
        ],
        departAt: date,
      });

      expect(ride).toEqual(
        success({
          id: "driver-ride-id",
          driverId: "driver-id",
          departAt: date,
          status: "OPEN",
          locations: [
            {
              name: "source",
              latitude: 0,
              longitude: 0,
            },
            {
              name: "destination",
              latitude: 0.001,
              longitude: 0.001,
            },
          ],
        }),
      );
    });
  });
  describe("register", () => {
    it("should able to become a driver", async () => {
      mockDriverRepo.findById.mockResolvedValueOnce(null);
      mockDriverRepo.save.mockResolvedValueOnce({
        id: "driver-id",
        capacity: 4,
        bio: "",
        rules: "",
        rides: [],
      });

      const ride = await service.register("driver-id", 4);

      expect(ride).toEqual({
        id: "driver-id",
        capacity: 4,
        bio: "",
        rules: "",
        rides: [],
      });
    });
  });
});
