import { type Location, type NamedLocation } from "../../core/domain/location";

export type LocationRepository = {
  findName(location: Location[]): Promise<NamedLocation[]>;
};
