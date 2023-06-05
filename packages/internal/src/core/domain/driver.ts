import { type DriverRide } from "./driverRide";

export type Driver = {
  id: string;
  capacity: number;
  bio: string;
  rides: DriverRide[];
};
