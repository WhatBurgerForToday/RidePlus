import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { api } from "~/utils/api";
import { RiderNavbar } from "~/components/Navbar/RiderNavbar";
import SignOut from "~/screens/auth/SignOut";

const ProfilePage = () => {
  const profileQuery = api.rider.profile.useQuery();
  const editMutation = api.rider.editProfile.useMutation();

  const [text, onChangeText] = useState(profileQuery.data?.bio);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="justify-top mt-44 h-full rounded-t-3xl bg-amber-500 px-5 py-5">
          <Text className="px-2 py-2 text-xl font-bold">Edit Your Bio</Text>

          <TextInput
            editable
            multiline
            numberOfLines={10}
            onChangeText={onChangeText}
            value={text}
            className="text-md mx-2 rounded-lg bg-white px-5"
            placeholder={text}
          />

          <TouchableOpacity
            onPress={() => {
              editMutation.mutate({ bio: text ?? "" });
              setModalVisible(!modalVisible);
            }}
          >
            <View className=" mx-2 my-4 w-28 flex-row items-center self-end rounded-lg bg-white px-6 py-2">
              <View className="pr-4">
                <AntDesign name="checkcircle" size={24} color="green" />
              </View>
              <Text className="font-bold">Edit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="justify-top mt-80 h-full rounded-t-3xl  px-5 py-5">
          <Text className="px-2 py-2 text-xl font-bold">Edit Your Bio</Text>

          <TextInput
            editable
            multiline
            numberOfLines={10}
            onChangeText={onChangeText}
            value={text}
            className="text-md mx-2 rounded-lg bg-white px-5"
            placeholder={text}
          />

          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <View className=" mx-2 my-4 w-28 flex-row items-center self-end rounded-lg bg-white px-6 py-2">
              <View className="pr-4">
                <AntDesign name="checkcircle" size={24} color="green" />
              </View>
              <Text className="font-bold">Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

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
            <View className="shrink">
              <Text className="">
                Total Paid: {profileQuery.data?.totalPaid}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-10">
          <Text>{text}</Text>
        </View>

        <View className="mx-5 mb-10 mt-5 border border-amber-400" />

        <View className="w-11/12 self-center rounded-xl bg-amber-100">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <Feather name="edit" size={24} color="black" />
              </View>
              <Text className="font-bold">Edit bio</Text>
            </View>
          </TouchableOpacity>

          <Link href="/rider/history" asChild>
            <TouchableOpacity className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <FontAwesome5 name="history" size={24} color="black" />
              </View>
              <Text className="font-bold">View History Rides</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/driver/profile" asChild>
            <TouchableOpacity className="h-14 flex-row items-center border border-white">
              <View className="pl-4 pr-6">
                <MaterialCommunityIcons
                  name="account-switch-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text className="font-bold">Switch to Driver's Account</Text>
            </TouchableOpacity>
          </Link>

          <SignOut />
        </View>
      </ScrollView>
      <RiderNavbar />
    </>
  );
};

export default ProfilePage;
