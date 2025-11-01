import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using default Vite port 5173
  // Redirect URI registered in Epic: http://localhost:5173/auth/epic/callback
})
