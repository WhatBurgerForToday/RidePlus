import { type Config } from "tailwindcss";

import baseConfig from "@rideplus/tailwind-config";

export default {
  presets: [baseConfig],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
} satisfies Config;
