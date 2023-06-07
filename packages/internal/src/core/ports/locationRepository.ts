import { type Location, type NamedLocation } from "../../core/domain/location";

export type LocationWithDistance = NamedLocation & { distance: number };

export type LocationRepository = {
  findName: (locationIds: string[]) => Promise<NamedLocation[]>;
  findNearby(
    location: Location,
    maxDistance: number,
  ): Promise<LocationWithDistance[]>;
};
