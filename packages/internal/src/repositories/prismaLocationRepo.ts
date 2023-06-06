import { type PrismaClient } from "@prisma/client";

import { type LocationRepository, type LocationWithDistance } from "../core";
import { type NamedLocation } from "../core/domain/location";

export const createPrimsaLocationRepo = (
  prisma: PrismaClient,
): LocationRepository => {
  return {
    findName: async (locations) => {
      const uniqueLocations = [...new Set(locations)];
      const namedLocations = await prisma.location.findMany({
        where: {
          AND: {
            latitude: {
              in: uniqueLocations.map((location) => location.latitude),
            },
            longitude: {
              in: uniqueLocations.map((location) => location.longitude),
            },
          },
        },
      });

      const locationMap = namedLocations.reduce((acc, location) => {
        acc[`${location.latitude},${location.longitude}`] = location;
        return acc;
      }, {} as Record<string, NamedLocation>);

      return locations.map((location) => {
        const key = `${location.latitude},${location.longitude}`;
        return locationMap[key] ?? { ...location, name: "unknown" };
      });
    },

    findNearby: async (location, maxDistance) => {
      const nearbyLocations = await prisma.$queryRaw<LocationWithDistance[]>`
        SELECT "id", "latitude", "longitude", "name", 
          ( 6371 * acos( 
            cos( radians( ${location.latitude} ) ) * 
            cos( radians( "latitude" ) ) * 
            cos( radians( "longitude" ) - radians( ${location.longitude} ) ) + 
            sin( radians( ${location.latitude} ) ) * 
            sin(radians(lat)) 
          ) ) AS "distance"
        FROM "Location"
        HAVING "distance" < ${maxDistance}
        ORDER BY "distance"
      `;

      return nearbyLocations;
    },
  };
};
