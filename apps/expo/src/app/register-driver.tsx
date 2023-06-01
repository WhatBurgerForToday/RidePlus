import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { RegisterItem } from "~/components/RegisterItem";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const CatImage: number = require("../images/Simon_cat.webp");

const PESSENGERITEMS = [
  {
    id: 1,
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    money: 120,
    img: CatImage,
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
    img: CatImage,
    name: "Simon",
  },
  {
    id: 2,
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "NYCU",
    money: 100,
    img: CatImage,
    name: "Simon",
  },
];

const Register = () => {
  const [text, onChangeText] = React.useState("");

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
          {PESSENGERITEMS.map(({ id, time, src, dest, money, img, name }) => (
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
          ))}
        </View>

        <View className="mb-5 mt-3 pb-3">
          <Text className="mx-7 py-2 text-xl font-bold">Pending</Text>
          {PENDITEMS.map(({ id, time, src, dest, money, img, name }) => (
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
    </>
  );
};

export default Register;
