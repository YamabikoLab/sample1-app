'use strict';

module.exports = {
  entry: {
    app: [
      './app/webpack/app.js'
    ]
  },
  output: {
    path: `${__dirname}/app/assets`,
    filename: 'javascripts/webpack_hoge.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/.*/
      },
    ]
  },
};
