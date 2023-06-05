import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const HistoryPage = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>Driver History Page</Text>
      <TouchableOpacity onPress={() => void router.back()}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HistoryPage;
