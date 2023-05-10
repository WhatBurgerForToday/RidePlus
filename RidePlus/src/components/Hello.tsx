import React from "react";
import { Text, View } from "react-native";

export type HelloProps = {
  name: string;
};

export const Hello = (props: HelloProps) => {
  const { name } = props;
  return (
    <View>
      <Text>Hello {name}</Text>
    </View>
  );
};
