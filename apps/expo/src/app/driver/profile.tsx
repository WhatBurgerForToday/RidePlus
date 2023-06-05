import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { atom, useSetAtom } from "jotai";

import { api } from "~/utils/api";
import { Modals } from "~/components/Modal";
import { DriverNavbar } from "~/components/Navbar/DriverNavbar";
import { RatingStars } from "~/components/RatingStars";
import SignOut from "~/screens/auth/SignOut";

export const bioAtom = atom(false);
export const capacityAtom = atom(false);
export const ruleAtom = atom(false);

const DriverProfile = () => {
  const setBioVisible = useSetAtom(bioAtom);
  const setRuleVisible = useSetAtom(ruleAtom);
  const setCapacityVisible = useSetAtom(capacityAtom);
  const [bio, setBio] = useState("");
  const [rule, setRule] = useState("");
  const [capacity, setCapacity] = useState("");
  const profile = api.driver.profile.useQuery(undefined, {
    onSuccess: (data) => {
      setBio(data.bio);
      setRule(data.rules);
      setCapacity(data.capacity.toString());
    },
  });

  return (
    <>
      <Modals atom={bioAtom} text="Bio" item={bio} setItem={setBio} />
      <Modals atom={ruleAtom} text="Rules" item={rule} setItem={setRule} />
      <Modals
        atom={capacityAtom}
        text="Capacity"
        item={capacity}
        setItem={setCapacity}
      />
      <View className="pb-5 pl-7 pt-20">
        <Text className="text-2xl font-bold text-amber-400">Profile</Text>
      </View>
      <ScrollView className="mb-5">
        <View className="mx-2 flex-row">
          <View className="justify-center px-5 py-5">
            <Image
              source={{ uri: profile.data?.avatarUrl }}
              className="h-24 w-24 rounded-full"
            />
          </View>
          <View className="flex-col justify-center pl-5">
            <Text className="text-xl font-bold">{profile.data?.name}</Text>
            <RatingStars stars={profile.data?.stars ?? 0} />
            <Text className="mt-2">Capacity: {profile.data?.capacity}</Text>
          </View>
        </View>

        <View className="px-10">
          <Text>{profile.data?.bio}</Text>
        </View>

        <View className="mx-5 mb-10 mt-5 border border-amber-400" />

        <View className="w-11/12 self-center rounded-xl bg-amber-100">
          <TouchableOpacity onPress={() => setBioVisible(true)}>
            <View className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <Feather name="edit" size={24} color="black" />
              </View>
              <Text className="font-bold">Edit Bio</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCapacityVisible(true)}>
            <View className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <Ionicons name="ios-people" size={24} color="black"></Ionicons>
              </View>
              <Text className="font-bold">Edit Capacity</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setRuleVisible(true)}>
            <View className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <MaterialIcons
                  name="rule"
                  size={24}
                  color="black"
                ></MaterialIcons>
              </View>
              <Text className="font-bold">Edit Rules</Text>
            </View>
          </TouchableOpacity>

          <Link href="/driver/history" asChild>
            <TouchableOpacity className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <FontAwesome5 name="history" size={24} color="black" />
              </View>
              <Text className="font-bold">View History Rides</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/driver/review" asChild>
            <TouchableOpacity className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <MaterialIcons name="comment-bank" size={24} color="black" />
              </View>
              <Text className="font-bold">View History Reviews</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/rider/profile" asChild>
            <TouchableOpacity className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <MaterialCommunityIcons
                  name="account-switch-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text className="font-bold">Switch to Rider's Account</Text>
            </TouchableOpacity>
          </Link>

          <SignOut />
        </View>
      </ScrollView>
      <DriverNavbar />
    </>
  );
};

export default DriverProfile;
