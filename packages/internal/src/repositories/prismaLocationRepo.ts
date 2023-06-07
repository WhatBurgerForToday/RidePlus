import { type PrismaClient } from "@prisma/client";

import { type LocationRepository, type LocationWithDistance } from "../core";
import { type NamedLocation } from "../core/domain/location";

export const createPrismaLocationRepo = (
  prisma: PrismaClient,
): LocationRepository => {
  return {
    findName: async (locations) => {
      const uniqueLocations = [...new Set(locations)];
      const namedLocations = await prisma.location.findMany({
        where: {
          id: {
            in: uniqueLocations,
          },
        },
      });

      const locationMap = namedLocations.reduce((acc, location) => {
        acc[location.id] = location;
        return acc;
      }, {} as Record<string, NamedLocation>);

      return locations.map((locationId) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return locationMap[locationId]!;
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
        HAVING ( "distance" * 1000 ) < ${maxDistance}
        ORDER BY "distance"
      `;

      return nearbyLocations;
    },
  };
};
