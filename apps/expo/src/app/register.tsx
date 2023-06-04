import { atom, useAtomValue } from "jotai";

import { DriverRegister } from "~/screens/register/DriverRegister";
import { RiderRegister } from "~/screens/register/RiderRegister";

type UserRole = "rider" | "driver";

export const userRoleAtom = atom<UserRole>("rider");

const RegisterPage = () => {
  const userRole = useAtomValue(userRoleAtom);

  if (userRole === "driver") {
    return <DriverRegister />;
  }
  return <RiderRegister />;
};

export default RegisterPage;
