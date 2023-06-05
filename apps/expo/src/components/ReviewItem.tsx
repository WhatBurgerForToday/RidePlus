import React, { type FC } from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { type RouterOutputs } from "@rideplus/api";

type ReviewItemProps = RouterOutputs["driver"]["reviews"][number];
type StarIconProps = {
  isActive: boolean;
};
const StarIcon: FC<StarIconProps> = (props) => {
  const { isActive } = props;
  const c = isActive ? "#FEC20C" : "#CCCCCC";
  return (
    <AntDesign name="star" size={16} backgroundColor="#FFFFFF" color={c} />
  );
};

export const ReviewItem = (props: ReviewItemProps) => {
  return (
    <View className="h-40">
      <View className="mt-1 flex-row">
        {new Array(5).fill(null).map((_, i) => (
          <StarIcon isActive={i < Math.round(props.stars)} />
        ))}
      </View>
      <Text className="mt-2">{props.comment}</Text>
    </View>
  );
};
