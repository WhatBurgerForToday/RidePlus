import { z } from "zod";

export const location = () => {
  return z.object({
    latitude: z.number(),
    longitude: z.number(),
  });
};
export const namedLocation = () => {
  return z.object({
    latitude: z.number(),
    longitude: z.number(),
    name: z.string().min(1),
  });
};
