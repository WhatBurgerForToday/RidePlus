import React, { useState, type Dispatch, type SetStateAction } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import { RideModal } from "./RideModal";

export type RegisterItemProps = {
  id: number;
  type:
    | "driver-passengers"
    | "driver-pending"
    | "rider-approved"
    | "rider-pending";
  time: string;
  src: string;
  dest: string;
  money: number;
  img: string;
  name: string;
};

type RegisterSubItemProps = {
  registerItemProps: RegisterItemProps;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const RegisterSubItem = (props: RegisterSubItemProps) => {
  const { registerItemProps, setModalVisible } = props;
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View className="h-40 flex-row">
        <View className="w-30 mr-4 h-full items-center justify-center px-2">
          <View>
            <Image
              className="h-20 w-20 rounded-full"
              source={{ uri: registerItemProps.img }}
            />
          </View>
          {(registerItemProps.type === "driver-passengers" ||
            registerItemProps.type === "rider-approved") && (
            <Text className="font-bold text-white">
              {registerItemProps.name}
            </Text>
          )}
          {(registerItemProps.type === "driver-pending" ||
            registerItemProps.type === "rider-pending") && (
            <Text className="font-bold text-black">
              {registerItemProps.name}
            </Text>
          )}
        </View>

        <View className="my-3 w-12 items-center justify-around">
          <EvilIcons name="clock" size={28} color="#000000" />
          <SimpleLineIcons name="target" size={22} color="#000000" />
          <SimpleLineIcons name="location-pin" size={22} color="#000000" />
          <Ionicons name="wallet-outline" size={22} color="#000000" />
        </View>
        <View className="my-3 w-5/12 justify-around">
          <Text className="text-sm">{registerItemProps.time}</Text>
          <Text className="text-sm">{registerItemProps.src}</Text>
          <Text className="text-sm">{registerItemProps.dest}</Text>
          <Text className="text-sm">$ {registerItemProps.money}</Text>
        </View>
        <View className="mt-28">
          {(registerItemProps.type === "driver-passengers" ||
            registerItemProps.type === "rider-approved") && (
            <Text className="text-sm font-bold text-green-600">Approved</Text>
          )}
          {(registerItemProps.type === "driver-pending" ||
            registerItemProps.type === "rider-pending") && (
            <Text className="text-sm font-bold text-neutral-600">Pending</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const RegisterItem = (props: RegisterItemProps) => {
  const { id, type } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {(type === "driver-passengers" || type === "rider-approved") && (
        <View className="w-full bg-amber-400 px-7">
          <RideModal
            id={id}
            type={type}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            registerItemProps={props}
          />
          <RegisterSubItem
            registerItemProps={props}
            setModalVisible={setModalVisible}
          />
        </View>
      )}
      {(type === "driver-pending" || type === "rider-pending") && (
        <View className="w-full px-7">
          <RideModal
            id={id}
            type={type}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            registerItemProps={props}
          />
          <RegisterSubItem
            registerItemProps={props}
            setModalVisible={setModalVisible}
          />
        </View>
      )}
    </View>
  );
};
