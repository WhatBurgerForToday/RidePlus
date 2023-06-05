import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export type RatingStarsProps = {
  stars: number;
};

export const RatingStars = ({ stars }: RatingStarsProps) => {
  return (
    <View className="mt-1 flex-row">
      {new Array(5).fill(null).map((_, i) => (
        <StarIcon key={i} isActive={i < Math.round(stars)} />
      ))}
    </View>
  );
};

type StarIconProps = {
  isActive: boolean;
};

const StarIcon = (props: StarIconProps) => {
  if (props.isActive) {
    return (
      <AntDesign
        name="star"
        size={16}
        backgroundColor="#FFFFFF"
        color="#FEC20C"
      />
    );
  }

  return (
    <AntDesign
      name="star"
      size={16}
      backgroundColor="#FFFFFF"
      color="#CCCCCC"
    />
  );
};
