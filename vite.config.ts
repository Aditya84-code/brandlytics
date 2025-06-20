import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    // Ensure terser options are properly configured
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Define environment variables for better error handling
  define: {
    __SUPABASE_URL__: JSON.stringify(process.env.VITE_SUPABASE_URL || ''),
    __SUPABASE_ANON_KEY__: JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || ''),
  },
});