import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  base: '/portfolio/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'node_modules'),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
};

export default config;
