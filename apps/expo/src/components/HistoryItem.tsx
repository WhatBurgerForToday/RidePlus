import React from "react";
import { Image, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

type HistoryItemProps = {
  id: string;
  source: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  departAt: Date;
  driver: { id: string; avatarUrl: string };
};

export const HistoryItem = (props: HistoryItemProps) => {
  return (
    <View className="h-40 flex-row">
      <View className="w-30 mr-4 h-full items-center justify-center px-2">
        <View>
          <Image
            className="h-20 w-20 rounded-full"
            source={{ uri: props.driver.avatarUrl }}
          />
        </View>
      </View>

      <View className="justify-center px-5">
        <View className="flex-row py-2">
          <AntDesign name="clockcircleo" size={20} />
          <Text className="px-2 text-sm">{props.departAt.toDateString()}</Text>
        </View>
        <View className="flex-row py-2">
          <SimpleLineIcons name="target" size={20} />
          <Text className="px-2 text-sm">
            ({props.source.latitude}, {props.source.longitude})
          </Text>
        </View>
        <View className="flex-row py-2">
          <SimpleLineIcons name="location-pin" size={20} />
          <Text className="px-2 text-sm">
            ({props.destination.latitude}, {props.destination.longitude})
          </Text>
        </View>
      </View>
    </View>
  );
};
