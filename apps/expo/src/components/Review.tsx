import React, { type Dispatch, type SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { api } from "~/utils/api";
import { ReviewItem } from "./ReviewItem";

type RiderHistoryProps = {
  setShowReview: Dispatch<SetStateAction<boolean>>;
};

export const Review = (props: RiderHistoryProps) => {
  const { setShowReview } = props;
  const reviews = api.driver.reviews.useQuery();
  return (
    <View className="mx-5">
      <View className="flex-row items-center pb-4">
        <TouchableOpacity onPress={() => setShowReview(false)}>
          <Ionicons name="arrow-back" size={28} color="rgb(251 191 36)" />
        </TouchableOpacity>

        <View className="px-4">
          <Text className="text-xl font-bold text-amber-400">
            Review Comments
          </Text>
        </View>
      </View>

      {reviews.data && (
        <View>
          {reviews.data.map((review) => (
            <ReviewItem key={review.id} {...review}/>
          ))}
        </View>
      )}
    </View>
  );
};
