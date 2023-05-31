import React from "react";
import { SafeAreaView, View } from "react-native";
import { Redirect } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

import SignInWithOAuth from "../screens/SignInWithOAuth";

export default function Login() {
  return (
    <SafeAreaView>
      <SignedIn>
        <Redirect href="/home" />
      </SignedIn>
      <SignedOut>
        <View className="flex h-full items-center justify-center">
          <SignInWithOAuth />
        </View>
      </SignedOut>
    </SafeAreaView>
  );
}
