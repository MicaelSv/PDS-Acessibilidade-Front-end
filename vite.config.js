import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Não se esqueça de incluir o plugin aqui
  server: {
    proxy: {
      '/api': {
        target: 'https://pds-acessibilidade-back-end.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
