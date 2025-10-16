import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true
    },
    define: {
      __BRAND_PRIMARY__: JSON.stringify(env.VITE_BRAND_PRIMARY ?? '#0D6EFD'),
      __BRAND_ACCENT__: JSON.stringify(env.VITE_BRAND_ACCENT ?? '#7A001F')
    }
  };
});
