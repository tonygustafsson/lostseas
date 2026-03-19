import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: path.resolve(__dirname, '.'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  logLevel: 'error',
})
