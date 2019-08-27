const webpack = require('webpack');
const merge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

let config = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new LoadablePlugin(),
  ],
};

if (!isProd) {
  config = merge(config, {
    resolve: {
      alias: { 'react-dom': '@hot-loader/react-dom' },
    },
  });
}

module.exports = config;
