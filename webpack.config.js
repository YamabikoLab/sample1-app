'use strict';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');

const jsList = [{
  entry: './app/webpack/frontend/app.js',
  cssEntry: './app/webpack/frontend/app.scss',
  name: 'webpack_frontend.js',
  cssName: 'webpack_frontend.css',
}];

module.exports = jsList.map(({entry, cssEntry, name, cssName}) => ({
  entry: {
    app: [
      '@babel/polyfill',
      'dom4',
      entry,
      cssEntry,
    ]
  },
  output: {
    path: `${__dirname}/app/assets`,
    filename: `javascripts/${name}`,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/.*/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              map: true,
              plugins: () => [
                autoprefixer({
                  grid: true,
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'ie >= 11',
                  ],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.yml$/,
        use: 'raw-loader',
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `stylesheets/${cssName}`,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {drop_console: true}
        }
      })
    ],
  },
}));
