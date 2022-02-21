import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "electron-fetch": "isomorphic-unfetch",
    },
  },
  optimizeDeps: {
    include: ["orbit-db", "./node_modules/default-gateway/index.js", "libp2p"],
  },
});
