export type ReviewRepository = {
  calculateDriverStars: (driverId: string) => Promise<number>;
};
