import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), svgr({ svgrOptions: { icon: true } })],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/Components'),
      '@assets': path.resolve(__dirname, './src/Assets'),
    },
  },
});
