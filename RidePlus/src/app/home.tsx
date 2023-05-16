// eslint-disable-next-line prettier/prettier
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
// eslint-disable-next-line prettier/prettier
import { ScrollView } from "react-native-gesture-handler";

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

          <View className="mx-5 my-2 rounded-lg bg-amber-400 px-2 py-5">
            <Link
              href={{
                pathname: "/test",
              }}
              asChild
            >
              <Pressable>
                <View className="flex flex-row">
                  <View className="justify-center px-5">
                    <AntDesign name="clockcircle" size={24} color="white" />
                  </View>
                  <View className=" px-2">
                    <Text className="py-1 font-bold text-black">
                      新竹火車站
                    </Text>
                    <Text className="py-1 text-white">Depart at PM 7:00</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          </View>

          <View className="mx-5 my-2 rounded-lg bg-amber-400 px-2 py-5">
            <Link
              href={{
                pathname: "/test",
              }}
              asChild
            >
              <Pressable>
                <View className="flex flex-row">
                  <View className="justify-center px-5">
                    <AntDesign name="clockcircle" size={24} color="white" />
                  </View>
                  <View className=" px-2">
                    <Text className="py-1 font-bold text-black">
                      陽明交通大學
                    </Text>
                    <Text className="py-1 text-white">Depart at PM 5:00</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          </View>
        </View>

        <View className="mx-7 mb-5 mt-3 pb-3">
          <Text className="py-2 text-xl font-bold">Favorite</Text>

          <View className="mx-5 my-2 rounded-lg bg-amber-400 px-2 py-5">
            <Link
              href={{
                pathname: "/test",
              }}
              asChild
            >
              <Pressable>
                <View className="flex flex-row">
                  <View className="justify-center px-5">
                    <FontAwesome name="heart" size={24} color="white" />
                  </View>
                  <View className=" px-2">
                    <Text className="py-1 font-bold text-black">TSMC</Text>
                    <Text className="py-1 text-white">Depart at AM 9:00</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          </View>
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
