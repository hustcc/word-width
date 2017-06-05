/**
 * Copyright (c) 2017 hustcc
 * License: MIT
 * GitHub: https://github.com/hustcc/word-width
 **/

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/word-width.js',
  output: {
    filename: 'word-width.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'WordWidth',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /.js$/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false }
    })
  ]
};