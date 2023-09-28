import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./www",
  },
  resolve: {
    alias: [
      {
        find: "src",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
