import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { api } from "~/utils/api";
import { RiderNavbar } from "~/components/Navbar/RiderNavbar";

const BecomeDriver = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const riderQuery = api.rider.profile.useQuery();
  const becomeDriver = api.rider.becomeDriver.useMutation({
    onSuccess: () => {
      router.push("/driver/profile");
    },
  });

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
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
      <View className="pb-5 pl-7 pt-20">
        <Text className="text-2xl font-bold text-amber-400">Profile</Text>
      </View>
      <ScrollView className="mb-5">
        <View className="mx-2 flex-row">
          <View className="justify-center px-5 py-5">
            <Image
              source={{ uri: riderQuery.data?.avatarUrl }}
              className="h-24 w-24 rounded-full"
            />
          </View>
          <View className="flex-col justify-center pl-5">
            <Text className="text-xl font-bold">{riderQuery.data?.name}</Text>
          </View>
        </View>
        <View className="items-center">
          <Text className="text-center">
            You are not a driver yet.{"\n"}Become driver to earn extra money!
          </Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <View className="mt-5 h-12 w-40 items-center justify-center rounded-xl bg-amber-400">
              <Text className="text-base font-bold text-white">
                Become Driver
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <RiderNavbar />
    </>
  );
};

export default BecomeDriver;
