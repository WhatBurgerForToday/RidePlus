import type { FC } from "react";
import React from "react";
import { Slot } from "expo-router";
import { RelayEnvironmentProvider } from "react-relay";

import { relayEnvironment } from "~/libs/RelayEnvironment";

const Layout: FC = () => {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Slot />
    </RelayEnvironmentProvider>
  );
};

export default Layout;
