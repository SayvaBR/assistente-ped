import { defineConfig } from 'vite';
export default defineConfig({
  build:{rollupOptions:{output:{manualChunks(id){if(id.includes('lottie-web'))return 'lottie';if(id.includes('node_modules')&&(id.includes('react-dom')||id.includes('/react/')))return 'react';}}}},
});
