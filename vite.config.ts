import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    wasm(),
    nodePolyfills({
      include: ["buffer", "process"],
    }),
  ],
  define: {
    "process.env": {},
    global: {},
  },
  build: {
    target: "esnext",
  },
});
