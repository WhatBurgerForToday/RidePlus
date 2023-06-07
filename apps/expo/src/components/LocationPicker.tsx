import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  type Region,
} from "react-native-maps";
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
      <MapView
        provider={PROVIDER_GOOGLE}
        className="h-5/6 w-full items-center justify-center"
      >
        <Text className="w-1/2 bg-white text-center text-lg">
          Refreshing...
        </Text>
      </MapView>
    );
  }

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
      </View>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        className="h-5/6 w-full"
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
    </View>
  );
};
