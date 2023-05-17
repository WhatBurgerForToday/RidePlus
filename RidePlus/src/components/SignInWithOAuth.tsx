import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow: startOAuthFlow_google } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startOAuthFlow_facebook } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onPressGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow_google({});

      if (createdSessionId) {
        void setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow_google]);

  const onPressFacebook = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow_facebook({});

      if (createdSessionId) {
        void setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow_facebook]);

  return (
    <View className="flex h-full w-full items-center justify-center bg-amber-400">
      <View className="py-10">
        <Text className="text-center text-7xl font-bold text-white">Ride+</Text>
      </View>
      <TouchableOpacity onPress={() => void onPressGoogle()}>
        <View className="w-80 px-4 py-3">
          <Text className="rounded-lg bg-white px-5 py-3 text-center text-base font-bold text-amber-400 shadow-xl shadow-orange-700">
            Sign in with Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => void onPressFacebook()}>
        <View className="w-80 px-4 py-3">
          <Text className="rounded-lg bg-white px-5 py-3 text-center text-base font-bold text-amber-400 shadow-xl shadow-orange-700">
            Sign in with Facebook
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default SignInWithOAuth;
