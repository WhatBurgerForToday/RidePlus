import React, { useState, type Dispatch, type SetStateAction } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import { RideModal } from "./RideModal";

export type RegisterItemProps = {
  id: string;
  type:
    | "driver-passengers"
    | "driver-pending"
    | "rider-approved"
    | "rider-pending";
  departAt: Date;
  source: { latitude: number; longitude: number; name: string };
  desiredDestination: { latitude: number; longitude: number; name: string };
  price: number;
  person: { id: string; name: string; avatarUrl: string };
};

type RegisterSubItemProps = {
  registerItemProps: RegisterItemProps;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const RegisterSubItem = (props: RegisterSubItemProps) => {
  const { registerItemProps, setModalVisible } = props;
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View className="h-40 flex-row pr-8">
        <View className="mr-4 h-full items-center justify-center px-2">
          <Image
            className="h-20 w-20 rounded-full"
            source={{ uri: registerItemProps.person.avatarUrl }}
          />
          {(registerItemProps.type === "driver-passengers" ||
            registerItemProps.type === "rider-approved") && (
            <Text className="pt-4 font-bold text-white">
              {registerItemProps.person.name}
            </Text>
          )}
          {(registerItemProps.type === "driver-pending" ||
            registerItemProps.type === "rider-pending") && (
            <Text className="pt-4 font-bold text-black">
              {registerItemProps.person.name}
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
          <Text className="text-sm">
            {registerItemProps.departAt.toDateString()}
          </Text>
          <Text className="text-sm">{registerItemProps.source.name}</Text>
          <Text className="text-sm">
            {registerItemProps.desiredDestination.name}
          </Text>
          <Text className="text-sm">$ {registerItemProps.price}</Text>
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
