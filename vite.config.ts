import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        '__APP_EMAILJS_SERVICE_ID__': JSON.stringify(env.VITE_EMAILJS_SERVICE_ID),
        '__APP_EMAILJS_TEMPLATE_ID__': JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID),
        '__APP_EMAILJS_PUBLIC_KEY__': JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
