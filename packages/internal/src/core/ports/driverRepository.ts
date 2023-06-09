import { type Driver } from "../domain/driver";

export type DriverRepository = {
  findById(id: string): Promise<Driver | null>;
  save(driver: Driver): Promise<Driver>;
};
