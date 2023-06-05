import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

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
        {({ active }) => <Ionicons name="md-home" {...iconStyle(active)} />}
      </Navbar.Link>

      <Navbar.Link href="/driver/register">
        {({ active }) => (
          <AntDesign name="clockcircle" {...iconStyle(active)} />
        )}
      </Navbar.Link>

      <Navbar.Link href="/driver/profile">
        {({ active }) => <FontAwesome name="user" {...iconStyle(active)} />}
      </Navbar.Link>
    </Navbar>
  );
};
