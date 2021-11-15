/**
 * @type {import('vite').UserConfig}
 */
const config = {
  publicPath: process.env.NODE_ENV === 'production' ? '/portfolio' : '/',
  resolve: {
    alias: {
      '@': './src',
    },
  },
};

export default config;
