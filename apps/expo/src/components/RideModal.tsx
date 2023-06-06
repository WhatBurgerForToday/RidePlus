import React, { type Dispatch, type SetStateAction } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  AntDesign,
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import { api } from "~/utils/api";
import type { RegisterItemProps } from "./RegisterItem";

export type RideModalProps = {
  id: string;
  type: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  registerItemProps: RegisterItemProps;
};

export const RideModal = (props: RideModalProps) => {
  const { id, type, modalVisible, setModalVisible, registerItemProps } = props;
  const cancelRideMutation = api.rider.leaveRide.useMutation();
  const driverMutation = api.driver.manageRider.useMutation();
  const finishRide = api.driver.finishRide.useMutation();

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="mt-52">
          <View className="justify-top h-full items-center rounded-t-3xl bg-amber-500 py-5">
            <View>
              <View className="flex-row">
                <View className="items-center px-2">
                  <View className="px-4 py-2">
                    <Image
                      className="h-20 w-20 rounded-full"
                      source={{ uri: registerItemProps.person.avatarUrl }}
                    />
                  </View>
                  <Text className="font-bold">
                    {registerItemProps.person.name}
                  </Text>
                </View>

                <View className="flex-row px-2">
                  <View className="my-3 w-12 items-center justify-around">
                    <EvilIcons name="clock" size={28} color="#000000" />
                    <SimpleLineIcons name="target" size={22} color="#000000" />
                    <SimpleLineIcons
                      name="location-pin"
                      size={22}
                      color="#000000"
                    />
                    <Ionicons name="wallet-outline" size={22} color="#000000" />
                  </View>
                  <View className="my-3 justify-around">
                    <Text className="text-sm">
                      {registerItemProps.departAt.toDateString()}
                    </Text>
                    <Text className="text-sm">
                      ({registerItemProps.source.latitude},{" "}
                      {registerItemProps.source.longitude})
                    </Text>
                    <Text className="text-sm">
                      ({registerItemProps.desiredDestination.latitude},{" "}
                      {registerItemProps.desiredDestination.longitude})
                    </Text>
                    <Text className="text-sm">$ {registerItemProps.price}</Text>
                  </View>
                </View>
              </View>

              <View className="my-8 h-3/5 items-center justify-center rounded-lg bg-white">
                <MapView
                  provider={PROVIDER_GOOGLE}
                  className="h-96 w-96"
                  showsUserLocation
                  initialRegion={{
                    latitude: registerItemProps.source.latitude,
                    longitude: registerItemProps.source.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09,
                  }}
                ></MapView>
              </View>

              <View className="py-1">
                {type === "driver-passengers" && (
                  <View className="flex-row items-center justify-around">
                    <TouchableOpacity
                      onPress={() => {
                        driverMutation.mutate({
                          rideId: id,
                          action: "cancel",
                          riderId: registerItemProps.person.id,
                        });
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View className="flex-row items-center rounded-lg bg-white px-6 py-2">
                        <View className="pr-4">
                          <MaterialCommunityIcons
                            name="close-circle"
                            size={24}
                            color="red"
                          />
                        </View>
                        <Text className="font-bold">Cancel</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        finishRide.mutate({
                          rideId: id,
                        });
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View className="flex-row items-center rounded-lg bg-white px-6 py-2">
                        <View className="pr-4">
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="green"
                          />
                        </View>
                        <Text className="font-bold">Finish</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {type === "driver-pending" && (
                  <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                      onPress={() => {
                        driverMutation.mutate({
                          rideId: id,
                          action: "deny",
                          riderId: registerItemProps.person.id,
                        });
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View className="flex-row items-center rounded-lg bg-white px-6 py-2">
                        <View className="pr-4">
                          <MaterialCommunityIcons
                            name="close-circle"
                            size={24}
                            color="red"
                          />
                        </View>
                        <Text className="font-bold">Deny</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        driverMutation.mutate({
                          rideId: id,
                          action: "approve",
                          riderId: registerItemProps.person.id,
                        });
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View className="flex-row items-center rounded-lg bg-white px-6 py-2">
                        <View className="pr-4">
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="green"
                          />
                        </View>
                        <Text className="font-bold">Approve</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {type === "rider-pending" && (
                  <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                      onPress={() => {
                        cancelRideMutation.mutate({ rideId: id });
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View className="flex-row items-center rounded-lg bg-white px-6 py-2">
                        <View className="pr-4">
                          <MaterialCommunityIcons
                            name="close-circle"
                            size={24}
                            color="red"
                          />
                        </View>
                        <Text className="font-bold">Cancel</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={true}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <View className="flex-row items-center rounded-lg bg-gray-200 px-6 py-2">
                        <View className="pr-4">
                          <AntDesign
                            name="clockcircle"
                            size={24}
                            color="orange"
                          />
                        </View>
                        <Text className="font-bold">Pending</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {type === "rider-approved" && (
                  <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                      onPress={() => {
                        cancelRideMutation.mutate({ rideId: id });
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View className="flex-row items-center rounded-lg bg-white px-6 py-2">
                        <View className="pr-4">
                          <MaterialCommunityIcons
                            name="close-circle"
                            size={24}
                            color="red"
                          />
                        </View>
                        <Text className="font-bold">Leave</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={true}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <View className="flex-row items-center rounded-lg bg-gray-200 px-6 py-2">
                        <View className="pr-4">
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="green"
                          />
                        </View>
                        <Text className="font-bold">Approved</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
