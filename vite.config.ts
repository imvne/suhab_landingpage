import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages (projet) : https://<user>.github.io/suhab_landingpage/
  base: '/suhab_landingpage/',
  plugins: [react()],
})
