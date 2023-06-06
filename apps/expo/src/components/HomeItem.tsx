import React from "react";
import { Text, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export type HomeItemProps = {
  id: string;
  type: "Recent" | "Favorite";
  source: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  departAt: Date;
};

export const HomeItem = (props: HomeItemProps) => {
  const { type, source, destination, departAt } = props;
  return (
    <View className="mx-5 my-2 rounded-lg bg-amber-400 px-2 py-5">
      <View className="flex flex-row">
        <View className="justify-center px-5">
          {type === "Recent" && (
            <AntDesign name="clockcircle" size={24} color="white" />
          )}
          {type === "Favorite" && (
            <FontAwesome name="heart" size={24} color="white" />
          )}
        </View>
        <View className=" px-2">
          <Text className="py-1 font-bold text-black">
            FROM ({source.latitude}, {source.longitude})
          </Text>
          <Text className="py-1 font-bold text-black">
            TO ({destination.latitude}, {destination.longitude})
          </Text>
          <Text className="py-1 text-white">
            Depart at {departAt.toDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};
