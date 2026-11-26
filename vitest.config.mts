import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  root: path.resolve(import.meta.dirname, "__tests__"),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
  test: {
    setupFiles: [path.resolve(import.meta.dirname, "__tests__/setup.ts")],
  },
  logLevel: "error",
})
