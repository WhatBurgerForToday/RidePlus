import { vi } from "vitest";

import {
  type DriverRepository,
  type DriverRideRepository,
  type LocationRepository,
  type PassengerRepository,
  type PassengerRideRepository,
  type ReviewRepository,
  type UserRepository,
} from "../core";

export const mockDriverRepo = {
  save: vi.fn(),
  findById: vi.fn(),
} satisfies DriverRepository;

export const mockPassengerRepo = {
  save: vi.fn(),
  findOrCreate: vi.fn(),
} satisfies PassengerRepository;

export const mockDriverRidesRepo = {
  findById: vi.fn(),
  save: vi.fn(),
  findByNearbyLocations: vi.fn(),
} satisfies DriverRideRepository;

export const mockPassengerRideRepo = {
  save: vi.fn(),
  findByDriverRideId: vi.fn(),
  countByDriverRideId: vi.fn(),
  findByPassengerIdWithStatus: vi.fn(),
  findFavoritesByPassengerId: vi.fn(),
  findByDriverIdWithStatus: vi.fn(),
} satisfies PassengerRideRepository;

export const mockLocationRepo = {
  findName: vi.fn(),
  findNearby: vi.fn(),
} satisfies LocationRepository;

export const mockUserRepo = {
  findById: vi.fn(),
  findManyByIds: vi.fn(),
} satisfies UserRepository;

export const mockReviewRepo = {
  calculateDriverStars: vi.fn(),
  findByDriverId: vi.fn(),
  save: vi.fn(),
} satisfies ReviewRepository;
