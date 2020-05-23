/**
 * Webpack 4 Development
 *
 */

const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new BrowserSyncPlugin({
      // Reload localhost:3000 during development
      host: 'localhost',
      port: 3000,
      proxy: 'localhost',
      notify: false,
    }),
  ],
});
