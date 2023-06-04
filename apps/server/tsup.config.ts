import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  format: ["cjs"],
  dts: false,
  sourcemap: false,
  splitting: false,
  clean: true,
  minify: true,
  target: "node18",
  noExternal: [/@rideplus\/.*/],
});
