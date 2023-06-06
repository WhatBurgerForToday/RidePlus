import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { HomeItem } from "~/components/HomeItem";
import { RiderNavbar } from "~/components/Navbar/RiderNavbar";
import { api } from "~/utils/api";

import {
  destinationAtom,
  sourceAtom,
} from "~/atoms/locationAtom";
import { dataAtom } from "./search";
import { useSetAtom } from "jotai";

const HomePage = () => {
  const recentQuery = api.rider.recentRide.useQuery();
  const favoriteQuery = api.rider.favoriteRide.useQuery();
  const router = useRouter();
  const setSrcAtom = useSetAtom(sourceAtom);
  const setDestAtom = useSetAtom(destinationAtom);
  const setDataAtom = useSetAtom(dataAtom);

  return (
    <>
      <View className="mb-5">
        <View className="pb-5 pl-7 pt-20">
          <Text className=" text-2xl font-bold text-amber-400">Ride+</Text>
        </View>

        <Link href="/rider/search" asChild>
          <Pressable className="flex items-center">
            <View className="w-5/6 flex-row place-items-center rounded-full bg-neutral-200 py-1.5">
              <View className="pl-5">
                <FontAwesome name="search" size={18} color="black" />
              </View>
              <Text className="text-md pl-5 text-neutral-500">Go where?</Text>
            </View>
          </Pressable>
        </Link>
      </View>

      <ScrollView className="relative">
        <View className="mx-7 pb-3">
          <Text className="sticky top-0 py-2 text-xl font-bold">Recent</Text>
          {recentQuery.data?.map(({ id, source, destination, departAt }) => (
            <TouchableOpacity onPress={() => {router.push("/rider/search"); setDataAtom(departAt); setSrcAtom(source); setDestAtom(destination);}}>
              <HomeItem
                key={id}
                id={id}
                type="Recent"
                source={source}
                destination={destination}
                departAt={departAt}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View className="mx-7 mb-5 mt-3 pb-3">
          <Text className="py-2 text-xl font-bold">Favorite</Text>
          {favoriteQuery.data?.map(({ id, source, destination, departAt }) => (
            <TouchableOpacity onPress={() => {router.push("/rider/search"); setDataAtom(departAt); setSrcAtom(source); setDestAtom(destination);}}>
              <HomeItem
                key={id}
                id={id}
                type="Recent"
                source={source}
                destination={destination}
                departAt={departAt}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-10 flex items-center rounded-lg">
          <Image
            source={{ uri: "https://hackmd.io/_uploads/rkLA70I83.jpg" }}
            resizeMode="contain"
            className="h-48 w-80 rounded-lg"
          />
        </View>
      </ScrollView>

      <RiderNavbar />
    </>
  );
};

export default HomePage;