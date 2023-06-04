import { useAtomValue } from "jotai";

import { DriverProfile } from "~/screens/profile/DriverProfile";
import { RiderProfile } from "~/screens/profile/RiderProfile";
import { userRoleAtom } from "./register";

const ProfilePage = () => {
  const userRole = useAtomValue(userRoleAtom);

  if (userRole === "driver") {
    return <DriverProfile />;
  }
  return <RiderProfile />;
};

export default ProfilePage;
