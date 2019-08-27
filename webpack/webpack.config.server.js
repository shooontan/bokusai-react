const { join } = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');
const pkgDir = require('pkg-dir');

const isProd = process.env.NODE_ENV === 'production';
const pkgdir = pkgDir.sync(__dirname);

let configServer = merge(require('./webpack.config.common'), {
  name: 'server',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    'app.server': join(pkgdir, 'src', 'app', 'app.server'),
  },
  output: {
    path: join(pkgdir, 'dist', 'server'),
    libraryTarget: 'commonjs2',
  },
  externals: ['@loadable/component', nodeExternals()],
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new WebpackBar({
      name: 'server',
      color: 'orange',
    }),
  ],
});

if (isProd) {
  configServer = merge(configServer, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: join(pkgdir, 'dist_analyzer', 'index.server.html'),
      }),
    ],
  });
} else {
  configServer = merge(configServer, {
    entry: {
      'entry.server': join(pkgdir, 'src', 'server', 'router'),
    },
  });
}

module.exports = configServer;
