import React, { type Dispatch, type SetStateAction } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  AntDesign,
  EvilIcons,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useAtomValue } from "jotai";

import { type RouterOutputs } from "@rideplus/api";

import { api } from "~/utils/api";
import { destinationAtom, sourceAtom } from "~/atoms/locationAtom";

type TravelItem = RouterOutputs["rider"]["searchRides"][number];

type SearchModalProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  travel: TravelItem;
};

export const SearchModal = (props: SearchModalProps) => {
  const { modalVisible, setModalVisible, travel } = props;
  const source = useAtomValue(sourceAtom);
  const destination = useAtomValue(destinationAtom);
  const applyRideMutation = api.rider.applyRide.useMutation();

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
                      source={{ uri: travel.driver.avatarUrl }}
                    />
                  </View>
                  <Text className="font-bold">{travel.driver.name}</Text>
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
                      {travel.departAt.toDateString()}
                    </Text>
                    <Text className="text-sm">{travel.source.name}</Text>
                    <Text className="text-sm">
                      {travel.desiredDestination.name}
                    </Text>
                    <Text className="text-sm">$ {travel.price}</Text>
                  </View>
                </View>
              </View>

              <View className="my-8 h-3/5 items-center justify-center rounded-lg bg-white">
                <MapView
                  provider={PROVIDER_GOOGLE}
                  className="h-96 w-96"
                  showsUserLocation
                  initialRegion={{
                    latitude: props.travel.source.latitude,
                    longitude: props.travel.source.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09,
                  }}
                >
                  <Marker coordinate={props.travel.source}></Marker>
                  <Marker coordinate={props.travel.desiredDestination}></Marker>
                </MapView>
              </View>

              <View className="items-end py-1">
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => {
                      applyRideMutation.mutate({
                        rideId: travel.id,
                        sourceId: travel.source.id,
                        destinationId: travel.desiredDestination.id,
                      });
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View className="flex-row items-center rounded-lg bg-white px-6 py-2">
                      <View className="pr-4">
                        <AntDesign name="checkcircle" size={24} color="green" />
                      </View>
                      <Text className="font-bold">Apply</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
