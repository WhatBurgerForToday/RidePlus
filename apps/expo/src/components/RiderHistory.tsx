import React, { type Dispatch, type SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { api } from "~/utils/api";
import { HistoryItem } from "./HistoryItem";

type RiderHistoryProps = {
  setShowHistory: Dispatch<SetStateAction<boolean>>;
};

export const RiderHistory = (props: RiderHistoryProps) => {
  const { setShowHistory } = props;
  const historyQuery = api.rider.rideHistory.useQuery();

  return (
    <View className="mx-5">
      <View className="flex-row items-center pb-4">
        <TouchableOpacity onPress={() => setShowHistory(false)}>
          <Ionicons name="arrow-back" size={28} color="rgb(251 191 36)" />
        </TouchableOpacity>

        <View className="px-4">
          <Text className="text-xl font-bold text-amber-400">
            History Rides
          </Text>
        </View>
      </View>

      <View>
        {historyQuery.data?.map(
          ({ id, source, destination, departAt, driver }) => (
            <HistoryItem
              key={id}
              id={id}
              source={source}
              destination={destination}
              departAt={departAt}
              driver={driver}
            />
          ),
        )}
      </View>
    </View>
  );
};
