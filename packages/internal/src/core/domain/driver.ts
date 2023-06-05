import { type DriverRide } from "./driverRide";

export type Driver = {
  id: string;
  rides: DriverRide[];
  capacity: number;
};
