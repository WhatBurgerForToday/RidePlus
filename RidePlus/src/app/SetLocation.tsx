import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import type { Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";

const SetLocation = () => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState<Region | null>(null);

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

  return (
    <View className="flex h-full flex-col items-center justify-center">
      <View className="h-1/6 w-full flex-row items-center bg-amber-400 pb-2 pt-12 shadow-sm shadow-gray-400">
        <View className="w-1/8 mb-1 ml-6 mr-2 h-full items-center justify-around">
          <Link href="/search">
            <FontAwesome
              name="angle-left"
              size={32}
              backgroundColor="#FBBF24"
              color="#000000"
            />
          </Link>
        </View>
        <View className="w-1/8 ml-4 mr-4 h-full items-center justify-around">
          <MaterialCommunityIcon
            name="target"
            size={26}
            backgroundColor="#FBBF24"
            color="#000000"
          />
        </View>
        <View className="h-10 w-3/5 justify-center rounded-xl border border-gray-400 bg-white">
          <TextInput
            className="mb-1 ml-3 text-sm"
            placeholder="Name this place"
            placeholderTextColor="#333"
          />
        </View>
      </View>
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
      <TouchableOpacity className="absolute bottom-10 right-6 h-16 w-16 items-center justify-center rounded-full bg-amber-400">
        <Ionicons
          name="ios-checkmark-sharp"
          size={42}
          backgroundColor="#FBBF24"
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SetLocation;
