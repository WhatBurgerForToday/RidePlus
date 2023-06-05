import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DriverNavbar } from "~/components/Navbar/DriverNavbar";

const HomePage = () => {
  return (
    <SafeAreaView>
      <Text>Home Page</Text>
      <DriverNavbar />
    </SafeAreaView>
  );
};

export default HomePage;
