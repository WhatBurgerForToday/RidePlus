import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { useSession } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";

import { HomeItem } from "~/components/HomeItem";

const RECENT = [
  { id: 1, location: "新竹火車站", departTime: "PM 7:00" },
  { id: 2, location: "陽明交通大學", departTime: "PM 5:00" },
  { id: 3, location: "陽明交通大學1", departTime: "PM 5:00" },
  { id: 4, location: "陽明交通大學2", departTime: "PM 5:00" },
  { id: 5, location: "陽明交通大學3", departTime: "PM 5:00" },
  { id: 6, location: "陽明交通大學4", departTime: "PM 5:00" },
  { id: 7, location: "陽明交通大學5", departTime: "PM 5:00" },
  { id: 8, location: "陽明交通大學6", departTime: "PM 5:00" },
  { id: 9, location: "陽明交通大學7", departTime: "PM 5:00" },
];

const FAVORITE = [
  { id: 1, location: "TSMC", departTime: "AM 9:00" },
  { id: 2, location: "TSMC2", departTime: "AM 8:30" },
];

const Home = () => {
  const { session } = useSession();
  const token = session?.lastActiveToken?.getRawString();
  console.log(token);

  return (
    <>
      <View className="mb-5">
        <View className="pb-5 pl-7 pt-20">
          <Text className=" text-2xl font-bold text-amber-400">Ride+</Text>
        </View>

        <Link
          href={{
            pathname: "/",
          }}
          asChild
        >
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
          {RECENT.map(({ id, location, departTime }) => (
            <HomeItem
              key={id}
              id={id}
              type="Recent"
              location={location}
              departTime={departTime}
            />
          ))}
        </View>

        <View className="mx-7 mb-5 mt-3 pb-3">
          <Text className="py-2 text-xl font-bold">Favorite</Text>
          {FAVORITE.map(({ id, location, departTime }) => (
            <HomeItem
              key={id}
              id={id}
              type="Favorite"
              location={location}
              departTime={departTime}
            />
          ))}
        </View>

        <View className="mb-10 flex items-center rounded-lg">
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={require("../images/simon_cat_drive.jpg")}
            resizeMode="contain"
            className="rounded-lg"
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
