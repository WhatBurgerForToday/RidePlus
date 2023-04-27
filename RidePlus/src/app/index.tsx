import React from "react";
import { Text, View } from "react-native";

import { Hello } from "~/components/Hello";

const Home = () => {
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <Text>Home</Text>
      <Hello name="World" />
    </View>
  );
};

export default Home;
