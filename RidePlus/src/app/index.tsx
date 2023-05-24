import React from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

import { Hello } from "~/components/Hello";

const App = () => {
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <Hello name="World" />

      <Link
        href={{
          pathname: "/home",
        }}
        asChild
      >
        <Pressable>
          <Text className="text-lg font-bold">Home</Text>
        </Pressable>
      </Link>

      <Link
        href={{
          pathname: "/login",
        }}
        asChild
      >
        <Pressable>
          <Text className="text-lg font-bold">Login</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default App;
