import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export type RatingStarsProps = {
  stars: number;
};

export const RatingStars = ({ stars }: RatingStarsProps) => {
  return (
    <View className="mt-1 flex-row">
      {new Array(5).fill(null).map((_, i) => (
        <AntDesign
          key={i}
          name="star"
          size={16}
          backgroundColor="#FFFFFF"
          color={i < stars ? "#FEC20C" : "#CCCCCC"}
        />
      ))}
    </View>
  );
};
