import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Nav } from "~/components/Nav";
import { RegisterItem } from "~/components/RegisterItem";

const PESSENGERITEMS = [
  {
    id: 1,
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    money: 120,
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    name: "Simon",
  },
];

const PENDITEMS = [
  {
    id: 1,
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    money: 120,
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    name: "Simon",
  },
  {
    id: 2,
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "NYCU",
    money: 100,
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    name: "Simon",
  },
];

const Register = () => {
  const [text, onChangeText] = React.useState("");

  // filter
  let FILTER_PESSENGERITEMS = [];
  let FILTER_PENDITEMS = [];
  if (text === "") {
    FILTER_PESSENGERITEMS = PESSENGERITEMS;
    FILTER_PENDITEMS = PENDITEMS;
  } else {
    FILTER_PESSENGERITEMS = PESSENGERITEMS.filter(
      ({ src, dest, name }) =>
        name.includes(text) || src.includes(text) || dest.includes(text),
    );
    FILTER_PENDITEMS = PENDITEMS.filter(
      ({ src, dest, name }) =>
        name.includes(text) || src.includes(text) || dest.includes(text),
    );
  }

  return (
    <>
      <View className="mb-5">
        <View className="pb-5 pl-7 pt-20">
          <Text className=" text-2xl font-bold text-amber-400">Register</Text>
        </View>

        <View className="flex items-center">
          <View className="w-5/6 flex-row place-items-center rounded-full bg-neutral-200 py-1.5">
            <View className="justify-center pl-5">
              <FontAwesome name="search" size={18} color="black" />
            </View>

            <TextInput
              onChangeText={onChangeText}
              value={text}
              className="text-md pl-5 text-neutral-500"
              placeholder="Find Passenger"
            />
          </View>
        </View>
      </View>

      <ScrollView className="relative">
        <View className="pb-3">
          <Text className="sticky top-0 mx-7 py-2 text-xl font-bold">
            Passengers
          </Text>
          {FILTER_PESSENGERITEMS.map(
            ({ id, time, src, dest, money, img, name }) => (
              <RegisterItem
                key={id}
                id={id}
                type="driver-passengers"
                time={time}
                src={src}
                dest={dest}
                money={money}
                img={img}
                name={name}
              />
            ),
          )}
        </View>

        <View className="mb-5 mt-3 pb-3">
          <Text className="mx-7 py-2 text-xl font-bold">Pending</Text>
          {FILTER_PENDITEMS.map(({ id, time, src, dest, money, img, name }) => (
            <RegisterItem
              key={id}
              id={id}
              type="driver-pending"
              time={time}
              src={src}
              dest={dest}
              money={money}
              img={img}
              name={name}
            />
          ))}
        </View>
      </ScrollView>
      <Nav />
    </>
  );
};

export default Register;
