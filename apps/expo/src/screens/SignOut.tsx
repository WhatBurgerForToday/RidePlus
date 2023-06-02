import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        signOut();
      }}
    >
      <View className="h-14 flex-row items-center border border-white">
        <View className="pl-4 pr-6">
          <MaterialIcons name="logout" size={24} color="black" />
        </View>
        <Text className="font-bold">Log out</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SignOut;
