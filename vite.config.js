import autoprefixer from 'autoprefixer';

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  base: '/portfolio/',
  resolve: {
    alias: {
      '@': './src',
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
};

export default config;
