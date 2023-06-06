import React, { useState, type FC } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import {
  EvilIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { atom, useAtom, useSetAtom } from "jotai";

import { api, type RouterOutputs } from "~/utils/api";
import { RiderNavbar } from "~/components/Navbar/RiderNavbar";
import { RatingStars } from "~/components/RatingStars";
import { SearchModal } from "~/components/SearchModal";
import {
  destinationAtom,
  locationTargetAtom,
  sourceAtom,
} from "~/atoms/locationAtom";

export const regionAtom = atom({
  latitude: 22,
  longitude: 123,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922,
});

type TravelItem = RouterOutputs["rider"]["searchRides"][number];

type Props = {
  travel: TravelItem;
};

const Travel: FC<Props> = (props) => {
  const { travel } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        travel={travel}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View className="h-40 flex-row">
          <View className="h-full w-32 items-center justify-center">
            <View>
              <Image
                className="h-20 w-20 rounded-full"
                source={{ uri: travel.driver.avatarUrl }}
              />
            </View>
            <RatingStars stars={travel.stars} />
          </View>

          <View className="my-3 w-12 items-center justify-around">
            <EvilIcons
              name="clock"
              size={28}
              backgroundColor="#FFFFFF"
              color="#000000"
            />
            <SimpleLineIcons
              name="target"
              size={22}
              backgroundColor="#FFFFFF"
              color="#000000"
            />
            <SimpleLineIcons
              name="location-pin"
              size={22}
              backgroundColor="#FFFFFF"
              color="#000000"
            />
            <Ionicons
              name="wallet-outline"
              size={22}
              backgroundColor="#FFFFFF"
              color="#000000"
            />
          </View>
          <View className="my-3 w-5/12 justify-around">
            <Text className="text-sm">{travel.departAt.toString()}</Text>
            <Text className="text-sm">{travel.source.name}</Text>
            <Text className="text-sm">{travel.desiredDestination.name}</Text>
            <Text className="text-sm">$ {travel.price}</Text>
          </View>
          <View className="ml-2 mt-28">
            <Text className="text-sm font-bold text-green-600">
              {travel.passengers.length}/{travel.driver.capacity}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const MILLIS_PER_DAY = 1000 * 86400;
export const dataAtom = atom(new Date(Date.now() + MILLIS_PER_DAY));

const SearchPage = () => {
  const [date, setDate] = useAtom(dataAtom);
  const setLocationTarget = useSetAtom(locationTargetAtom);
  const [source, setSource] = useAtom(sourceAtom);
  const [destination, setDestination] = useAtom(destinationAtom);
  const router = useRouter();

  const searchQuery = api.rider.searchRides.useQuery({
    departAt: date,
    source: source,
    destination: destination,
    limit: 5,
  });

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate == null) return;
    setDate(selectedDate);
  };

  const renderItem = ({ item }: { item: TravelItem }) => (
    <Travel travel={item} />
  );

  return (
    <View className="flex-1 bg-white">
      <View className="h-1/4 flex-row items-center bg-amber-400 pb-2 pt-12 shadow-sm shadow-gray-400">
        <View className="ml-6 mr-2 mt-7 h-full">
          <FontAwesome
            name="angle-left"
            size={32}
            backgroundColor="#FBBF24"
            color="#000000"
            onPress={() => router.back()}
          />
        </View>
        <View className="ml-4 mr-4 mt-3 h-full items-center justify-around">
          <EvilIcons
            name="clock"
            size={32}
            backgroundColor="#FBBF24"
            color="#000000"
          />
          <MaterialCommunityIcons
            name="target"
            size={26}
            backgroundColor="#FBBF24"
            color="#000000"
          />
          <MaterialIcons
            name="location-pin"
            size={28}
            backgroundColor="#FBBF24"
            color="#000000"
          />
        </View>
        <View className="mt-2 h-full items-center justify-around">
          <View className="h-10 w-56 justify-center rounded-xl border border-gray-400 bg-white">
            <DateTimePicker
              testID="dateTimePicker"
              mode="datetime"
              value={date}
              onChange={onChange}
              display="default"
            />
          </View>
          <View className="h-10 w-56 justify-center rounded-xl border border-gray-400 bg-white">
            <Text
              className="ml-3 text-sm"
              onPress={() => {
                setLocationTarget("source");
                router.push("/rider/set-location");
              }}
            >
              {source.latitude === 0 && source.longitude === 0
                ? "Press here to select location"
                : `緯度: ${source.latitude.toFixed(
                    4,
                  )}${"   "}經度: ${source?.longitude.toFixed(4)}`}
            </Text>
          </View>
          <View className="h-10 w-56 justify-center rounded-xl border border-gray-400 bg-white">
            <Text
              className="ml-3 text-sm"
              onPress={() => {
                setLocationTarget("destination");
                router.push("/rider/set-location");
              }}
            >
              {destination.latitude === 0 && destination.longitude === 0
                ? "Press here to select location"
                : `緯度: ${destination.latitude.toFixed(
                    4,
                  )}${"   "}經度: ${destination?.longitude.toFixed(4)}`}
            </Text>
          </View>
        </View>

        <View className="ml-3 mr-2 mt-48 h-full">
          <MaterialIcons
            name="swap-vert"
            size={32}
            backgroundColor="#FBBF24"
            color="#000000"
            onPress={() => {
              setSource({
                latitude: destination.latitude,
                longitude: destination.longitude,
              });
              setDestination({
                latitude: source.latitude,
                longitude: source.longitude,
              });
            }}
          />
        </View>
      </View>

      <SafeAreaView className="mt-2 flex-1">
        <FlatList
          data={searchQuery.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <RiderNavbar />
    </View>
  );
};

export default SearchPage;
