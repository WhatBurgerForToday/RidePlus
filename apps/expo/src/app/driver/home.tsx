import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { type Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { atom, useAtom } from "jotai";

import { api } from "~/utils/api";
import { DriverNavbar } from "~/components/Navbar/DriverNavbar";

export type Location = {
  name: string;
  longitude: number;
  latitude: number;
};

export const createLocationsAtom = atom<Location[]>([]);
export const addLocationAtom = atom<Region | null>(null);
export const addLocationNameAtom = atom<string>("");

const MILLIS_PER_DAY = 1000 * 86400;
export const dateAtom = atom(new Date(Date.now() + MILLIS_PER_DAY));

const HomePage = () => {
  const [locations, setLocations] = useAtom(createLocationsAtom);
  const [addLocation, setAddLocation] = useAtom(addLocationAtom);
  const [locationName, setLocationName] = useAtom(addLocationNameAtom);
  const [date, setDate] = useAtom(dateAtom);
  const addRideMutation = api.driver.create.useMutation();

  const handleAddLocation = () => {
    setLocations((prev) => [
      ...prev,
      {
        name: locationName,
        longitude: addLocation?.longitude ?? 0,
        latitude: addLocation?.latitude ?? 0,
      },
    ]);
    setLocationName("");
    setAddLocation(null);
  };

  const handleAddRide = () => {
    addRideMutation.mutate({
      departAt: date,
      locations,
    });
  };

  return (
    <>
      <SafeAreaView className="flex-auto">
        <View className="mt-6 pb-5 pl-7">
          <Text className="text-2xl font-bold text-amber-400">Trip</Text>
        </View>

        <View className="mx-4 mt-2 items-center">
          <View className=" w-full items-center rounded-2xl bg-amber-100 p-4">
            <Text className="mt-2 text-center text-xl font-semibold">
              Create a trip !
            </Text>
            <TextInput
              className="mt-4 h-8 w-60 rounded-2xl bg-white px-2"
              placeholder="name"
              value={locationName}
              onChangeText={(text) => setLocationName(text)}
            />
            <Link href="/driver/set-location" asChild>
              <TouchableOpacity className="mt-4 h-8 w-60 justify-center rounded-2xl bg-white px-2">
                {addLocation ? (
                  <Text>
                    ({addLocation?.latitude.toFixed(4)},{" "}
                    {addLocation?.longitude.toFixed(4)})
                  </Text>
                ) : (
                  <View className="h-full justify-center">
                    <Text className="text-gray-400">Location</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              className="mt-4 rounded-xl bg-amber-400 p-2"
              onPress={() => handleAddLocation()}
            >
              <Text className="font-semibold">Add a location</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-4 mt-4 flex-auto rounded-2xl bg-amber-100">
          <View className="mt-2 items-center border-b border-b-amber-400 p-1">
            <View className="h-10 w-56 flex-row items-center justify-center rounded-xl">
              <Text className=" text-lg font-semibold">Depart Time</Text>
              <DateTimePicker
                className="text-sm"
                testID="dateTimePicker"
                mode="datetime"
                value={date}
                onChange={(_, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }}
                display="default"
              />
            </View>
          </View>
          <ScrollView className="">
            <View className="items-center gap-2 py-4">
              {locations.map((location, id) => (
                <View
                  key={location.name}
                  className="w-56 flex-row rounded-lg bg-white p-2"
                >
                  <View className="px-1">
                    <Text className="text-lg">{id + 1}.</Text>
                  </View>
                  <View>
                    <Text className="text-lg font-semibold">
                      {location.name}
                    </Text>
                    <Text className="text-base">
                      ({location.latitude.toFixed(4)},{" "}
                      {location.longitude.toFixed(4)})
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          className="mx-4 mt-2 rounded-xl bg-amber-400"
          onPress={() => handleAddRide()}
        >
          <Text className="p-2 text-center text-base font-semibold">
            Add ride
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <DriverNavbar />
    </>
  );
};

export default HomePage;
