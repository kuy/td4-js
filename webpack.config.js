'use strict';

var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: '/in-memory'
  },
  plugins: [
    new FlowStatusWebpackPlugin()
  ],
  devtool: 'inline-source-map'
};
