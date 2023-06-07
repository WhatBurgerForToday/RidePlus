import { type Expand } from "../../types/magic";

export type Location = {
  latitude: number;
  longitude: number;
};

export type LocationWithId = Expand<
  {
    id: string;
  } & Location
>;

export type NamedLocation = Expand<Location & { name: string }>;

export type NamedLocationWithId = Expand<LocationWithId & { name: string }>;
