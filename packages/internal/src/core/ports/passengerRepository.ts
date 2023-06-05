import { type Passenger } from "../domain/passenger";

export type PassengerRepository = {
  findOrCreate: (id: string) => Promise<Passenger>;
};
