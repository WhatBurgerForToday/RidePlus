import React, {
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import { api } from "~/utils/api";
import type { HistoryItemProps } from "./HistoryItem";

type HistoryModalProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  historyItemProps: HistoryItemProps;
};

type StarProps = {
  starNum: number;
  setStarNum: Dispatch<SetStateAction<number>>;
  starIdx: number;
};

const ReviewStar: FC<StarProps> = (props) => {
  const { starNum, setStarNum, starIdx } = props;
  const starred = starNum >= starIdx ? true : false;
  return (
    <View className="px-2">
      <TouchableOpacity onPress={() => setStarNum(starIdx)}>
        {starred && <AntDesign name="star" size={24} color="#faad14" />}
        {!starred && <AntDesign name="star" size={24} color="#d9d9d9" />}
      </TouchableOpacity>
    </View>
  );
};

export const HistoryModal = (props: HistoryModalProps) => {
  const { modalVisible, setModalVisible, historyItemProps } = props;
  const [starNum, setStarNum] = useState(4);
  const [commentInput, setCommentInput] = useState("");
  const historyMutation = api.rider.rateRide.useMutation();

  return (
    <View className="items-center justify-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="mx-8 my-8 flex-1 flex-col items-center justify-center rounded-2xl bg-amber-400">
          <Text className="text-xl font-bold">Feedback</Text>

          <View className="my-5 h-3/5 w-3/4 items-center rounded-2xl bg-white">
            <View className="flex-row py-4">
              {new Array(5).fill(null).map((_, i) => (
                <ReviewStar
                  key={i}
                  starNum={starNum}
                  setStarNum={setStarNum}
                  starIdx={i}
                />
              ))}
            </View>
            <View className="mb-2 w-full border border-amber-400" />
            <TextInput
              editable
              multiline
              numberOfLines={10}
              onChangeText={setCommentInput}
              value={commentInput}
              className="text-md mx-2 w-full rounded-lg bg-gray-200 px-5"
              placeholder={commentInput}
            />
          </View>

          <View className="flex-row items-center justify-between py-2">
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <View className="mx-2 flex-row items-center rounded-lg bg-white px-4 py-2">
                <View className="pr-4">
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color="red"
                  />
                </View>
                <Text className="font-bold">Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                historyMutation.mutate({
                  rideId: historyItemProps.id,
                  stars: starNum + 1,
                  comment: commentInput,
                });
                setModalVisible(!modalVisible);
              }}
            >
              <View className="mx-2 flex-row items-center rounded-lg bg-white px-4 py-2">
                <View className="pr-4">
                  <AntDesign name="checkcircle" size={24} color="green" />
                </View>
                <Text className="font-bold">Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
