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
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Nav } from "~/components/Nav";
import { RiderHistory } from "~/components/RiderHistory";
import SignOut from "~/screens/SignOut";

const PROFILEINFO = {
  name: "Simon's Cat",
  img: "https://hackmd.io/_uploads/Byne59oS2.png",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  totalPaid: 120,
};

const RiderProfile = () => {
  const [text, onChangeText] = useState(PROFILEINFO.bio);
  const [modalVisible, setModalVisible] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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

          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
              source={{ uri: PROFILEINFO.img }}
              className="h-24 w-24 rounded-full"
            />
          </View>
          <View className="flex-col justify-center pl-5">
            <Text className="text-xl font-bold">{PROFILEINFO.name}</Text>
            <View className="shrink">
              <Text className="">Total Paid: {PROFILEINFO.totalPaid}</Text>
            </View>
          </View>
        </View>

        <View className="px-10">
          <Text>{text}</Text>
        </View>

        <View className="mx-5 mb-10 mt-5 border border-amber-400" />

        {showHistory && <RiderHistory setShowHistory={setShowHistory} />}

        {!showHistory && (
          <View className="w-11/12 self-center rounded-xl bg-amber-100">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View className="h-14 flex-row items-center border border-white">
                <View className="pl-4 pr-6">
                  <Feather name="edit" size={24} color="black" />
                </View>
                <Text className="font-bold">Edit bio</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowHistory(true)}>
              <View className="h-14 flex-row items-center border border-white">
                <View className="pl-4 pr-6">
                  <FontAwesome5 name="history" size={24} color="black" />
                </View>
                <Text className="font-bold">View History Rides</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View className="h-14 flex-row items-center border border-white">
                <View className="pl-4 pr-6">
                  <MaterialCommunityIcons
                    name="account-switch-outline"
                    size={24}
                    color="black"
                  />
                </View>
                <Text className="font-bold">Switch to Driver's Account</Text>
              </View>
            </TouchableOpacity>

            <SignOut />
          </View>
        )}
      </ScrollView>
      <Nav />
    </>
  );
};
export default RiderProfile;
