import { z } from "zod";

export const location = () => {
  return z.object({
    latitude: z.number(),
    longitude: z.number(),
  });
};
