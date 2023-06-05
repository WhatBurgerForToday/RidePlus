import { type User } from "../domain/user";

export type UserRepository = {
  findById: (id: string) => Promise<User | null>;
  findManyByIds: (ids: string[]) => Promise<Map<string, User>>;
};
