/**
 * @type {import('vite').UserConfig}
 */
const config = {
  publicPath: process.env.NODE_ENV === 'production' ? '/portfolio' : '/',
};

export default config;
