import { type NamedLocation } from "~/core/domain/location";

export const locationsToConnectOrCreate = (locations: NamedLocation[]) => {
  return locations.map((location) => {
    return {
      where: {
        latitude_longitude: location,
      },
      create: location,
    };
  });
};
