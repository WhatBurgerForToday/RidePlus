import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export type HomeItemProps = {
  id: number;
  type: string;
  location: string;
  departTime: string;
};

export const HomeItem = (props: HomeItemProps) => {
  const { type, location, departTime } = props;
  return (
    <View className="mx-5 my-2 rounded-lg bg-amber-400 px-2 py-5">
      <Link
        href={{
          pathname: "/",
        }}
        asChild
      >
        <TouchableOpacity>
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
              <Text className="py-1 font-bold text-black">{location}</Text>
              <Text className="py-1 text-white">Depart at {departTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
