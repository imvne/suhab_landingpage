import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // minimoapps.fr + minimoapps.fr/suhab : assets à la racine ("/assets/…").
  base: '/',
  // GitHub Pages sert soit root "/" soit "/docs" → on build dans docs/
  build: { outDir: 'docs' },
  plugins: [react()],
})
