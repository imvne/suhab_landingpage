import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // minimoapps.fr + minimoapps.fr/suhab : assets à la racine ("/assets/…").
  base: '/',
  plugins: [react()],
})
