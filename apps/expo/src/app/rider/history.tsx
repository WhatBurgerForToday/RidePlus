import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { api } from "~/utils/api";
import { HistoryItem } from "~/components/HistoryItem";

const HistoryPage = () => {
  const historyQuery = api.rider.rideHistory.useQuery();
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="mx-5">
        <View className="flex-row items-center pb-4">
          <TouchableOpacity onPress={() => void router.back()}>
            <Ionicons name="arrow-back" size={28} color="rgb(251 191 36)" />
          </TouchableOpacity>

          <View className="px-4">
            <Text className="text-xl font-bold text-amber-400">
              History Rides
            </Text>
          </View>
        </View>

        <FlatList
          data={historyQuery.data}
          keyExtractor={(item) => item.id}
          className="h-full w-full"
          renderItem={({ item }) => <HistoryItem key={item.id} {...item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryPage;
