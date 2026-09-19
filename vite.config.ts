import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-plugin-redirect-base',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/GRIND') {
            res.writeHead(302, { Location: '/GRIND/' });
            res.end();
          } else {
            next();
          }
        });
      }
    }
  ],
  base: '/GRIND/',
})



