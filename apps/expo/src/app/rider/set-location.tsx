import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  type Region,
} from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAtomValue, useSetAtom } from "jotai";

import {
  destinationAtom,
  locationTargetAtom,
  sourceAtom,
} from "~/atoms/locationAtom";

const SetLocationPage = () => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState<Region | null>(null);
  const setSource = useSetAtom(sourceAtom);
  const setDestination = useSetAtom(destinationAtom);
  const router = useRouter();
  const locationTarget = useAtomValue(locationTargetAtom);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      });
    })().catch(console.error);
  }, []);

  const handleClick = () => {
    // Update the state by calling the updatePageState function passed as prop
    if (region == null) return;
    if (locationTarget === "source") {
      setSource({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
    if (locationTarget === "destination") {
      setDestination({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
    router.back();
  };

  return (
    <View className="relative flex h-full flex-col items-center justify-center">
      <View className="h-1/6 w-full flex-row items-center bg-amber-400 pb-2 pt-12 shadow-sm shadow-gray-400">
        <View className="w-1/8 mb-1 ml-6 mr-2 h-full items-center justify-around">
          <FontAwesome
            name="angle-left"
            size={32}
            backgroundColor="#FBBF24"
            color="#000000"
            onPress={() => router.back()}
          />
        </View>
        <View className="w-1/8 ml-4 mr-4 h-full items-center justify-around">
          <MaterialCommunityIcons
            name="target"
            size={26}
            backgroundColor="#FBBF24"
            color="#000000"
          />
        </View>
        <View className="h-10 w-3/5 justify-center rounded-xl border border-gray-400 bg-white">
          <Text className="ml-3">
            緯度: {region?.latitude.toFixed(4)}
            {"    "}
            經度: {region?.longitude.toFixed(4)}
          </Text>
        </View>
      </View>
      {!region && (
        <MapView
          provider={PROVIDER_GOOGLE}
          className="h-5/6 w-full items-center justify-center"
        >
          <Text className="w-1/2 bg-white text-center text-lg">
            Refreshing...
          </Text>
        </MapView>
      )}
      {region && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          className="h-5/6 w-full"
          showsUserLocation
          initialRegion={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          <Marker coordinate={region} />
        </MapView>
      )}
      <View className="absolute bottom-10 right-6 h-16 w-16 items-center justify-center rounded-full bg-amber-400">
        <Ionicons
          name="ios-checkmark-sharp"
          size={42}
          backgroundColor="#FBBF24"
          color="#FFFFFF"
          onPress={handleClick}
        />
      </View>
    </View>
  );
};

export default SetLocationPage;
