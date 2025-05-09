import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  // add the server object
  server: {
    port: 3001,
  },
  define: {
    "process.env": process.env,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
