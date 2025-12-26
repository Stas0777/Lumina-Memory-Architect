import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix: Define __dirname for ESM context since it is not globally available
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: './', // CRITICAL: Ensures assets use relative paths like ./assets/ instead of /assets/
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        // Fix: Use the manually defined __dirname
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      // Fix: Use the manually defined __dirname
      '@': path.resolve(__dirname, './src'),
    },
  },
});
