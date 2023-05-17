import React from "react";
import { SafeAreaView, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import SignInWithOAuth from "../components/SignInWithOAuth";
import Home from "./home";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_dG9wcy1tYWxhbXV0ZS02MC5jbGVyay5hY2NvdW50cy5kZXYk";
export default function Login() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SafeAreaView>
        <SignedIn>
          <Home />
        </SignedIn>
        <SignedOut>
          <View className="flex h-full items-center justify-center">
            <SignInWithOAuth />
          </View>
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}
