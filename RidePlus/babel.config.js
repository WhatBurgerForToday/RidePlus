/** @type {import("@babel/core").ConfigFunction} */
function config(api) {
  api.cache(true);

  process.env.EXPO_ROUTER_APP_ROOT = "src/app";

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "relay",
      "nativewind/babel",
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      "expo-router/babel",
      ["module-resolver", { alias: { "~": "./src" } }],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
}

module.exports = config;
