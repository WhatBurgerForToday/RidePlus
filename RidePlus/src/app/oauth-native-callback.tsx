import type { FC } from "react";
import React from "react";
import { Redirect } from "expo-router";

const OAuthNativeCallback: FC = () => {
  return <Redirect href="/home" />;
};

export default OAuthNativeCallback;
