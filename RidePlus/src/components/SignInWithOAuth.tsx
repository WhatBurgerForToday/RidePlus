/* eslint-disable no-void */
/* eslint-disable prettier/prettier */
import { useOAuth } from "@clerk/clerk-expo";
import { maybeCompleteAuthSession } from "expo-web-browser";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startOAuthFlow_facebook } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onPressGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        // await startOAuthFlow();
        // await startOAuthFlow({ redirectUrl: "/" });
        await startOAuthFlow({}); // /oauth-native-callback

      if (createdSessionId) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressFacebook = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow_facebook({});

      if (createdSessionId) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
