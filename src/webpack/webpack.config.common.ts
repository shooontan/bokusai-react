import * as webpack from 'webpack';
import merge from 'webpack-merge';
import LoadablePlugin from '@loadable/webpack-plugin';
import { isDev } from './utils';

type CommonConfigArgs = {
  target: webpack.Configuration['target'];
};

export const webpackBaseConfig = ({ target }: CommonConfigArgs) => {
  let config: webpack.Configuration = {
    target,
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
            options: {
              caller: { target },
            },
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

  if (isDev) {
    config = merge(config, {
      resolve: {
        alias: { 'react-dom': '@hot-loader/react-dom' },
      },
    });
  }

  return config;
};
