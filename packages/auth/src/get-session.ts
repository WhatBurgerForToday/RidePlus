import { getAuth as $getAuth } from "@clerk/fastify";

export type GetAuth = typeof $getAuth;
export type AuthObject = ReturnType<GetAuth>;

export const getAuth: GetAuth = (request) => {
  return $getAuth(request);
};
