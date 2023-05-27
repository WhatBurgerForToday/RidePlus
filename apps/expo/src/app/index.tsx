import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";

import { api } from "~/utils/api";

const IndexPage = () => {
  const { isSignedIn } = useAuth();
  const sessionQuery = api.auth.getSession.useQuery();

  console.log(isSignedIn, sessionQuery.data);
  return (
    <SafeAreaView className="h-full w-full bg-pink-300">
      <Text className="bg-pink-400">
        {JSON.stringify(sessionQuery.data, null, 2)}
      </Text>
    </SafeAreaView>
  );
};

export default IndexPage;
