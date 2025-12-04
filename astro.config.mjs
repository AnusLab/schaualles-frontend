// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://schaualles.com',
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      modulePreload: {
        polyfill: false
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'lucide': ['lucide-react']
          }
        }
      }
    }
  },
  
  build: {
    inlineStylesheets: 'always'
  },

  integrations: [react()]
});