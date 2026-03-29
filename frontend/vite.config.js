import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const allowedPreviewHosts = [process.env.RAILWAY_PUBLIC_DOMAIN].filter(Boolean);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    allowedHosts: allowedPreviewHosts,
  },
});
