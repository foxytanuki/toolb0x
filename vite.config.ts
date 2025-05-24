import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    wasm(),
    nodePolyfills({
      include: ['buffer', 'process'],
    }),
  ],
  define: {
    'process.env': {},
    global: {},
  },
  build: {
    target: 'esnext',
  },
});
