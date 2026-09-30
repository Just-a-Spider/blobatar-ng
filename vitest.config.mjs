import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: [
      {
        find: /.*blobatar\.component$/,
        replacement: path.resolve(import.meta.dirname, './dist/fesm2022/just-a-spider-blobatar-ng.mjs'),
      },
    ],
  },
});
