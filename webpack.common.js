/**
 * Webpack 4 Common
 *
 */

const path = require('path');
const sass = require('sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  entry: {
    'css/styles': './src/scss/styles.scss',
  },

  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sourceMap: true,
            },
          },
          {
            loader: 'webpack-import-glob-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'webpack-import-glob-loader',
        ],
      },
    ],
  },

  plugins: [
    // Compiles entry stylesheets
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // Removes [name].js output from compiled stylesheets
    new FixStyleOnlyEntriesPlugin(),
  ],

  optimization: {
    // Extracts node_module script imports to a separate `vendors` file
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'js/vendors',
          chunks: 'all',
        },
      },
    },
  },
};
