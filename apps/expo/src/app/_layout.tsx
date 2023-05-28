import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import { tokenCache } from "~/utils/cache";
import { CLERK_PUBLISHABLE_KEY } from "~/constants";
import SignInWithOAuth from "~/screens/SignInWithOAuth";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      // tokenCache={tokenCache}
    >
      <SignedIn>
        <TRPCProvider>
          <SafeAreaProvider>
            <Slot />
          </SafeAreaProvider>
        </TRPCProvider>
      </SignedIn>
      <SignedOut>
        <SignInWithOAuth />
      </SignedOut>
    </ClerkProvider>
  );
};

export default RootLayout;
