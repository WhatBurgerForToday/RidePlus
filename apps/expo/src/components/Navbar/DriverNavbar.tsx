import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

import { Navbar } from "./Navbar";

export const DriverNavbar = () => {
  const iconStyle = (active: boolean) => ({
    size: 36,
    color: active ? "#FBBF24" : "#FFFFFF",
    backgroundColor: active ? "#FFFFFF" : "",
  });

  return (
    <Navbar>
      <Navbar.Link href="/driver/home">
        {/* {({ active }) => <Ionicons name="md-home" {...iconStyle(active)} />} */}
        {({ active }) => (
          <FontAwesome5 name="car-side" {...iconStyle(active)} />
        )}
      </Navbar.Link>

      <Navbar.Link href="/driver/register">
        {({ active }) => (
          <Ionicons name="newspaper-sharp" {...iconStyle(active)} />
        )}
      </Navbar.Link>

      <Navbar.Link href="/driver/profile">
        {({ active }) => <FontAwesome name="user" {...iconStyle(active)} />}
      </Navbar.Link>
    </Navbar>
  );
};
