import React from "react";
import { SafeAreaView, View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

import SignInWithOAuth from "../components/SignInWithOAuth";
import Home from "./home";

export default function Login() {
  return (
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
  );
}
