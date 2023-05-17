// eslint-disable-next-line prettier/prettier
import { Redirect } from "expo-router";
import type { FC } from "react";
// eslint-disable-next-line prettier/prettier
import React from "react";

const OAuthNativeCallback: FC = () => {
  return <Redirect href="/home" />;
};

export default OAuthNativeCallback;
