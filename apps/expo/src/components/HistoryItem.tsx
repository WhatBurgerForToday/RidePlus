import React, { useState, type Dispatch, type SetStateAction } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

type HistoryItemProps = {
  id: number;
  src: string;
  dest: string;
  time: string;
  name: string;
  img: string;
};

export const HistoryItem = (props: HistoryItemProps) => {
  return (
    <View className="h-40 flex-row">
      <View className="w-30 mr-4 h-full items-center justify-center px-2">
        <View>
          <Image
            className="h-20 w-20 rounded-full"
            source={{ uri: props.img }}
          />
        </View>
        <Text className="font-bold">{props.name}</Text>
      </View>

      <View className="justify-center px-5">
        <View className="flex-row py-2">
          <AntDesign name="clockcircleo" size={20} />
          <Text className="px-2 text-sm">{props.time}</Text>
        </View>
        <View className="flex-row py-2">
          <SimpleLineIcons name="target" size={20} />
          <Text className="px-2 text-sm">{props.src}</Text>
        </View>
        <View className="flex-row py-2">
          <SimpleLineIcons name="location-pin" size={20} />
          <Text className="px-2 text-sm">{props.dest}</Text>
        </View>
      </View>
    </View>
  );
};
