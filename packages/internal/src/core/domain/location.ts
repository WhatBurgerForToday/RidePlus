import { type Expand } from "../../types/magic";

export type Location = {
  latitude: number;
  longitude: number;
};

export type NamedLocation = Expand<Location & { name: string }>;
