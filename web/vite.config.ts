import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgr({ include: "**/*.svg" })],
  build: {
    target: "es2015",
    outDir: "dist",
  },
  logLevel: "silent",
  server: {
    open: true,
    port: 3001,
    strictPort: true,
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
      "~": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  css: {
    preprocessorOptions: {
      // If you're using SASS global variables or mixins, you can include them here
      sass: {
        additionalData: `$injectedColor: red;`,
      },
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
