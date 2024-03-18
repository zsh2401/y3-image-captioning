import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    proxy: {
      //配置跨域
      '/api': {
        target: 'https://image.ai.zsh2401.top',
        changeOrigin: true, //允许跨域
        // rewrite: (path) => path.replace('/api', ''),
        timeout: 6 * 60 * 1000,
      },
    },
  }
})
