import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  root: path.resolve(__dirname, "__tests__"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  logLevel: "error",
  plugins: [tailwindcss()],
})
