import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// PENTING UNTUK GITHUB PAGES
// Ganti 'album-ayah' dengan nama repositori GitHub kamu.
// Kalau nanti pakai domain sendiri, ubah nilainya jadi '/'.
export default defineConfig({
  base: '/album-ayah/',
  plugins: [react(), tailwindcss()],
});
