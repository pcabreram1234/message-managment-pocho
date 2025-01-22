import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[tj]sx?$/, // Incluye tanto .js, .jsx, .ts, como .tsx
  },
  server: {
    host: "localhost",
    port: 8086,
    open: true,

  },
  build: {
    rollupOptions: {
      external: ['antd/dist/reset.css']
    }
  }
});