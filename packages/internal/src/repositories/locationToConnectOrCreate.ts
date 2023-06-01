import { type Location } from "~/core/domain/location";

export const locationsToConnectOrCreate = (locations: Location[]) => {
  // TODO: get the correct name
  return locations.map((location) => {
    return {
      where: {
        latitude_longitude: location,
      },
      create: {
        latitude: location.latitude,
        longitude: location.longitude,
        name: "123",
      },
    };
  });
};
