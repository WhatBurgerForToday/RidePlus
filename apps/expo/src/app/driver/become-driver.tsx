import React, { useState } from "react";
import {
  Image,
  LogBox,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { api } from "~/utils/api";

LogBox.ignoreLogs([
  "TRPCClientError: You are not a driver yet",
  "Modal with 'formSheet' presentation style and 'transparent' value is not supported.",
]);

const BecomeDriver = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const utils = api.useContext();
  const riderQuery = api.rider.profile.useQuery();
  const becomeDriver = api.rider.becomeDriver.useMutation({
    onSuccess: () => {
      void utils.driver.profile.refetch();
    },
  });

  return (
    <>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
        presentationStyle="formSheet"
        transparent={true}
      >
        <View className="absolute bottom-0 h-1/3 w-full rounded-t-3xl bg-amber-500 px-5 py-5">
          <Text className="px-2 py-2 text-xl font-bold">
            Passenger Capacity
          </Text>
          <View className="mt-3 flex-row justify-between">
            <View className="mx-2 h-10 w-1/2 items-center rounded-lg bg-white px-5">
              <Text className="mt-2 text-base">{capacity}</Text>
            </View>
            <View className="w-2/5 flex-row justify-between pr-2">
              <TouchableOpacity
                className="w-16 items-center justify-center rounded-lg bg-white"
                onPress={() =>
                  setCapacity(capacity < 10 ? capacity + 1 : capacity)
                }
              >
                <Text>➕</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-16 items-center justify-center rounded-lg bg-white"
                onPress={() =>
                  setCapacity(capacity > 1 ? capacity - 1 : capacity)
                }
              >
                <Text>➖</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-8">
            <TouchableOpacity
              className="mx-2 my-4 w-36 flex-row items-center self-end rounded-lg bg-white px-6 py-2"
              onPress={() => {
                setVisible(!visible);
                becomeDriver.mutate({ capacity: capacity });
              }}
            >
              <View className="pr-2">
                <AntDesign name="checkcircle" size={24} color="green" />
              </View>
              <Text className="font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <SafeAreaView className="h-full bg-amber-400">
        <TouchableOpacity
          className="ml-6 mt-6 w-10 items-center rounded-full bg-white"
          onPress={() => void router.back()}
        >
          <Ionicons name="arrow-back" size={36} color="black" />
        </TouchableOpacity>
        <View className="mb-5 flex-auto">
          <View className="flex-auto items-center justify-center bg-amber-400">
            <Image
              source={{ uri: riderQuery.data?.avatarUrl }}
              className="h-24 w-24 rounded-full"
            />
            <View className="items-center">
              <Text className="mt-4 text-center text-xl font-semibold">
                You are not a driver yet.{"\n"}Become driver to earn extra
                money!
              </Text>
              <TouchableOpacity
                className="mt-12"
                onPress={() => setVisible(true)}
              >
                <View className="h-12 w-40 items-center justify-center rounded-xl bg-white">
                  <Text className="text-base font-bold text-amber-500">
                    Become Driver
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default BecomeDriver;
