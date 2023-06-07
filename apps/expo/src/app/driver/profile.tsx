import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { api } from "~/utils/api";
import { Modal } from "~/components/Modal";
import { DriverNavbar } from "~/components/Navbar/DriverNavbar";
import { RatingStars } from "~/components/RatingStars";
import { useObjectState } from "~/hooks/useObjectState";
import SignOut from "~/screens/auth/SignOut";
import BecomeDriver from "./become-driver";

type ModalTypes = "Bio" | "Rules" | "Capacity" | "none";

const ProfilePage = () => {
  const [visibleModal, setVisibleModal] = useState<ModalTypes>("none");
  const [profile, updateProfile] = useObjectState({
    bio: "",
    rules: "",
    capacity: "",
  });

  const profileQuery = api.driver.profile.useQuery(undefined, {
    onSuccess: (data) => {
      updateProfile({ ...data, capacity: data.capacity.toString() });
    },
    onError: (err) => {
      console.log("here is an error", err);
    },
    retry(failureCount, error) {
      if (error.data?.code === "UNAUTHORIZED") return false;
      return failureCount < 2;
    },
  });

  if (profileQuery.isLoading) {
    return (
      <SafeAreaView className="h-full items-center justify-center">
        <Image
          source={{ uri: "https://hackmd.io/_uploads/H1uca9p8h.gif" }}
          style={{ width: 400, height: 300 }}
        />
      </SafeAreaView>
    );
  }

  if (profileQuery.data == null) {
    return <BecomeDriver />;
  }

  return (
    <>
      <Modal
        text="Bio"
        value={profile.bio}
        onChangeText={(text) => updateProfile({ bio: text })}
        visible={visibleModal === "Bio"}
        onClose={() => setVisibleModal("none")}
      />
      <Modal
        text="Rules"
        value={profile.rules}
        onChangeText={(text) => updateProfile({ rules: text })}
        visible={visibleModal === "Rules"}
        onClose={() => setVisibleModal("none")}
      />
      <Modal
        text="Capacity"
        value={profile.capacity}
        onChangeText={(text) => updateProfile({ capacity: text })}
        visible={visibleModal === "Capacity"}
        onClose={() => setVisibleModal("none")}
      />

      <View className="pb-5 pl-7 pt-20">
        <Text className="text-2xl font-bold text-amber-400">Profile</Text>
      </View>
      <ScrollView className="mb-5">
        <View className="mx-2 flex-row">
          <View className="justify-center px-5 py-5">
            <Image
              source={{ uri: profileQuery.data?.avatarUrl }}
              className="h-24 w-24 rounded-full"
            />
          </View>
          <View className="flex-col justify-center pl-5">
            <Text className="text-xl font-bold">{profileQuery.data?.name}</Text>
            <RatingStars stars={profileQuery.data?.stars ?? 0} />
            <Text className="mt-2">
              Capacity: {profileQuery.data?.capacity}
            </Text>
          </View>
        </View>

        <View className="px-10">
          <Text>{profileQuery.data?.bio}</Text>
        </View>

        <View className="mx-5 mb-10 mt-5 border border-amber-400" />

        <View className="w-11/12 self-center rounded-xl bg-amber-100">
          <TouchableOpacity onPress={() => setVisibleModal("Bio")}>
            <View className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <Feather name="edit" size={24} color="black" />
              </View>
              <Text className="font-bold">Edit Bio</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVisibleModal("Capacity")}>
            <View className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <Ionicons name="ios-people" size={24} color="black"></Ionicons>
              </View>
              <Text className="font-bold">Edit Capacity</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVisibleModal("Rules")}>
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

export default ProfilePage;
