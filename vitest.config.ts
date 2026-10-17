import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  root: path.resolve(__dirname, "__tests__"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    setupFiles: [path.resolve(__dirname, "__tests__/setup.ts")],
  },
  logLevel: "error",
})
