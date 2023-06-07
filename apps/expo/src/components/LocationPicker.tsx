import { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  type Region,
} from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

type LocationPickerProps = {
  locations: Region[];
  setLocation: (location: Region) => void;
};

export const LocationPicker = ({
  setLocation,
  locations,
}: LocationPickerProps) => {
  const [region, setRegion] = useState<Region | null>(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const setCurrentLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const currentLocation = await getCurrentPositionAsync({});
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      });
    };
    void setCurrentLocation();
  }, []);

  const router = useRouter();
  const handleClick = ({ region }: { region: Region | null }) => {
    if (region == null) return;
    setLocation(region);
    router.back();
  };

  if (!region) {
    return (
      <SafeAreaView className="h-full items-center justify-center">
        <Image
          source={{ uri: "https://hackmd.io/_uploads/H1uca9p8h.gif" }}
          style={{ width: 400, height: 300 }}
          className="bg-amber-400"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-auto justify-center bg-amber-400">
      <View className="h-14 w-full flex-row items-center bg-amber-400 pb-2">
        <TouchableOpacity
          className="ml-4 h-14 w-14 items-center justify-around rounded-full"
          onPress={() => router.back()}
        >
          <FontAwesome
            name="angle-left"
            size={32}
            backgroundColor="#FBBF24"
            color="#000000"
          />
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        className="w-full flex-auto"
        showsUserLocation
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker coordinate={region} />
        {locations.map((location, index) => (
          <Marker coordinate={location} key={index}></Marker>
        ))}
      </MapView>
      <View className="absolute bottom-10 right-6 h-16 w-16 items-center justify-center rounded-full bg-amber-400">
        <Ionicons
          name="ios-checkmark-sharp"
          size={42}
          backgroundColor="#FBBF24"
          color="#FFFFFF"
          onPress={() => handleClick({ region })}
        />
      </View>
    </SafeAreaView>
  );
};
