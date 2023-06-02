import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HistoryItem } from "./HistoryItem";

const HISTORYITEMS = [
  {
    id: 1,
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "新竹城隍廟",
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    name: "Simon",
  },
  {
    id: 2,
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "NYCU",
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    name: "Simon",
  },
  {
    id: 3,
    time: "Thu Apr 20 11:07 PM",
    src: "TSMC Fab 7",
    dest: "NYCU",
    img: "https://hackmd.io/_uploads/Byne59oS2.png",
    name: "Simon",
  },
];

type RiderHistoryProps = {
  setShowHistory: Dispatch<SetStateAction<boolean>>;
};

export const RiderHistory = (props: RiderHistoryProps) => {
  const { setShowHistory } = props;
  return (
    <View className="mx-5">
      <View className="flex-row items-center pb-4">
        <TouchableOpacity onPress={() => setShowHistory(false)}>
          <Ionicons name="arrow-back" size={28} color="rgb(251 191 36)" />
        </TouchableOpacity>

        <View className="px-4">
          <Text className="text-xl font-bold text-amber-400">
            History Rides
          </Text>
        </View>
      </View>

      <View>
        {HISTORYITEMS.map(({ id, time, src, dest, img, name }) => (
          <HistoryItem
            key={id}
            id={id}
            time={time}
            src={src}
            dest={dest}
            img={img}
            name={name}
          />
        ))}
      </View>
    </View>
  );
};
