import type { FC } from "react";
import React from "react";
import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { RelayEnvironmentProvider } from "react-relay";

import { relayEnvironment } from "~/libs/RelayEnvironment";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_dG9wcy1tYWxhbXV0ZS02MC5jbGVyay5hY2NvdW50cy5kZXYk";

const Layout: FC = () => {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <Slot />
      </ClerkProvider>
    </RelayEnvironmentProvider>
  );
};

export default Layout;
