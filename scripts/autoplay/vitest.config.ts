import path from "path"
import { defineConfig } from "vitest/config"

const projectRoot = path.resolve(__dirname, "../..")

// Runs the bot with Vitest, which already knows the @ paths and mocks.
// Kept apart from the test config so npm test never plays hundreds of games.
export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      "@": projectRoot,
      "server-only": path.resolve(__dirname, "serverOnlyStub.ts"),
    },
  },
  test: {
    include: ["autoplay.run.ts"],
    setupFiles: [path.resolve(projectRoot, "__tests__/setup.ts")],
    testTimeout: 0,
    silent: false,
  },
  logLevel: "error",
})
