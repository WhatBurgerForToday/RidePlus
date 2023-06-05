import React, { type FC } from "react";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

import { Navbar } from "./Navbar";

export const RiderNavbar: FC = () => {
  const iconStyle = (active: boolean) => ({
    size: 36,
    color: active ? "#FBBF24" : "#FFFFFF",
    backgroundColor: active ? "#FFFFFF" : "",
  });

  return (
    <Navbar>
      <Navbar.Link href="/rider/home">
        {({ active }) => <Ionicons name="md-home" {...iconStyle(active)} />}
      </Navbar.Link>

      <Navbar.Link href="/rider/register">
        {({ active }) => (
          <AntDesign name="clockcircle" {...iconStyle(active)} />
        )}
      </Navbar.Link>

      <Navbar.Link href="/rider/profile">
        {({ active }) => <FontAwesome name="user" {...iconStyle(active)} />}
      </Navbar.Link>
    </Navbar>
  );
};
