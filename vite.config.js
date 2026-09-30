import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: { host: '0.0.0.0', allowedHosts: ['.e2b.app'] },
});
