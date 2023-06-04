import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  type Region,
} from "react-native-maps";
import * as Location from "expo-location";
import { Link, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAtom, useAtomValue } from "jotai";

import { destAtom, pageAtom, srcAtom } from "./search";

const SetLocation = () => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [, setSrc] = useAtom(srcAtom);
  const [, setDest] = useAtom(destAtom);
  const router = useRouter();
  const page = useAtomValue(pageAtom);

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
    if (page.page === "src") {
      setSrc({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
    if (page.page === "dest") {
      setDest({
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

export default SetLocation;
