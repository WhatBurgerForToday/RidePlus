// eslint-disable-next-line prettier/prettier
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
// eslint-disable-next-line prettier/prettier
import { ScrollView } from "react-native-gesture-handler";

import { Favorite } from "../components/Favorite";
import { Recent } from "../components/Recent";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="pb-5 pl-7 pt-20">
          {/* fail to apply gradient text: bg-gradient-to-r from-amber-400 */}
          <Text className=" text-2xl font-bold text-amber-400">Ride+</Text>
        </View>

        <Link
          href={{
            pathname: "/test",
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

        <View className="mx-7 mt-5 pb-3">
          <Text className="py-2 text-xl font-bold">Recent</Text>
          <Recent location="新竹火車站" departTime="PM 7:00" />
          <Recent location="陽明交通大學" departTime="PM 5:00" />
        </View>

        <View className="mx-7 mb-5 mt-3 pb-3">
          <Text className="py-2 text-xl font-bold">Favorite</Text>
          <Favorite location="TSMC" departTime="AM 9:00" />
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
    </SafeAreaView>
  );
};

export default Home;
