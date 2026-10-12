import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // Set base to './' so all output HTML asset paths are relative
    base: './',

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue'],
            'vue-router': ['vue-router'],
          },
        },
      },
    },
    server: {
      historyApiFallback: true,
    },
    preview: {
      port: 4173,
      historyApiFallback: true,
      base: './',
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || mode),
    },
  }
})
