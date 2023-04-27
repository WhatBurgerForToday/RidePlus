import React from "react";
import { Text } from "react-native";

export type HelloProps = {
  name: string;
};

export const Hello = (props: HelloProps) => {
  const { name } = props;
  return <Text>Hello {name}</Text>;
};
