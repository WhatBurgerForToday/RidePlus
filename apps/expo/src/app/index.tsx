import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const IndexPage = () => {
  return (
    <SafeAreaView className="h-full w-full bg-pink-300">
      <Text className="bg-pink-400"></Text>
      <View className="flex h-full flex-col items-center justify-center">
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
            pathname: "/register-driver",
          }}
          asChild
        >
          <Pressable>
            <Text className="text-lg font-bold">Register Driver</Text>
          </Pressable>
        </Link>
        <Link
          href={{
            pathname: "/register-rider",
          }}
          asChild
        >
          <Pressable>
            <Text className="text-lg font-bold">Register Rider</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;
