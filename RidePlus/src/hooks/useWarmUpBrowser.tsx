/* eslint-disable no-void */
// eslint-disable-next-line prettier/prettier
import * as WebBrowser from "expo-web-browser";
import React from "react";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
