import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { api, type RouterOutputs } from "~/utils/api";
import { RatingStars } from "~/components/RatingStars";

const ReviewPage = () => {
  const router = useRouter();
  const reviews = api.driver.reviews.useQuery();

  return (
    <SafeAreaView>
      <View className="mx-5">
        <View className="flex-row items-center pb-4">
          <TouchableOpacity onPress={() => void router.back()}>
            <Ionicons name="arrow-back" size={28} color="rgb(251 191 36)" />
          </TouchableOpacity>

          <View className="px-4">
            <Text className="text-xl font-bold text-amber-400">
              Review Comments
            </Text>
          </View>
        </View>

        <FlatList
          data={reviews.data}
          keyExtractor={(item) => item.id}
          className="h-full w-full"
          renderItem={({ item }) => <ReviewItem key={item.id} {...item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReviewPage;

type ReviewItemProps = RouterOutputs["driver"]["reviews"][number];

const ReviewItem = (props: ReviewItemProps) => {
  return (
    <View className="h-40">
      <RatingStars stars={props.stars} />
      <Text className="mt-2">{props.comment}</Text>
    </View>
  );
};
