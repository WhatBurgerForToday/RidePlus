// eslint-disable-next-line prettier/prettier
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
// eslint-disable-next-line prettier/prettier
import { Pressable, Text, View } from "react-native";

export type FavoriteProps = {
  location: string;
  departTime: string;
};

export const Favorite = (props: FavoriteProps) => {
  const { location, departTime } = props;
  return (
    <View className="mx-5 my-2 rounded-lg bg-amber-400 px-2 py-5">
      <Link
        href={{
          pathname: "/test",
        }}
        asChild
      >
        <Pressable>
          <View className="flex flex-row">
            <View className="justify-center px-5">
              <FontAwesome name="heart" size={24} color="white" />
            </View>
            <View className=" px-2">
              <Text className="py-1 font-bold text-black">{location}</Text>
              <Text className="py-1 text-white">Depart at {departTime}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};
