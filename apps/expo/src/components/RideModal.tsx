import React, { type Dispatch, type SetStateAction } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import type { RegisterItemProps } from "./RegisterItem";

export type RideModalProps = {
  id: number;
  type: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  registerItemProps: RegisterItemProps;
};

export const RideModal = (props: RideModalProps) => {
  const { type, modalVisible, setModalVisible, registerItemProps } = props;
  return (
    <View className="">
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
                      source={{ uri: registerItemProps.img }}
                    />
                  </View>
                  <Text className="font-bold">{registerItemProps.name}</Text>
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
                    <Text className="text-sm">{registerItemProps.time}</Text>
                    <Text className="text-sm">{registerItemProps.src}</Text>
                    <Text className="text-sm">{registerItemProps.dest}</Text>
                    <Text className="text-sm">$ {registerItemProps.money}</Text>
                  </View>
                </View>
              </View>

              <View className="my-8 h-3/5 items-center justify-center rounded-lg bg-white">
                <MapView
                  provider={PROVIDER_GOOGLE}
                  className="h-96 w-96"
                  showsUserLocation
                  initialRegion={{
                    latitude: 24.8148,
                    longitude: 120.9675,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09,
                  }}
                >
                  <Text>test</Text>
                </MapView>
              </View>

              <View className="py-1">
                {type === "driver-passengers" && (
                  <View className="flex-row items-center justify-end">
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
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
                  </View>
                )}

                {type === "driver-pending" && (
                  <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
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
                      onPress={() => setModalVisible(!modalVisible)}
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
                      onPress={() => setModalVisible(!modalVisible)}
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
                      onPress={() => setModalVisible(!modalVisible)}
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
