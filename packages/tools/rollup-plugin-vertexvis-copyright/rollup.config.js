import {
  config,
  typescript,
  output,
  minify,
  input
} from "@vertexvis/build-tools";

export default config(input("src/index.ts"), typescript(), output(), minify());
