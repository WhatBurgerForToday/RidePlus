import { getAuth as $getAuth } from "@clerk/nextjs/server";

export type GetAuth = typeof $getAuth;
export type AuthObject = ReturnType<GetAuth>;

export const getAuth: GetAuth = (request) => {
  return $getAuth(request);
};
