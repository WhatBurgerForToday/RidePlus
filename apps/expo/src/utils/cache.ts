import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const saveToken = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getToken = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

export const tokenCache =
  Platform.OS !== "web" ? { getToken, saveToken } : undefined;
