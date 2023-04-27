import { Text } from "react-native";

export const Hello = (props: { name: string }) => {
  const { name } = props;
  return <Text>Hello {name}</Text>;
};
