import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// defineConfig ko function ke saath use karo
export default defineConfig(({ mode }) => ({
  plugins: [react()],
})
