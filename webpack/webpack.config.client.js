const { join, resolve } = require('path');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');

const isProd = process.env.NODE_ENV === 'production';
const pkgdir = resolve(__dirname, '..');

const target = 'web';

let configClient = merge(require('./webpack.config.common')({ target }), {
  name: 'client',
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?timeout=10000',
      join(pkgdir, 'src', 'app', 'app.client'),
    ],
  },
  output: {
    path: join(pkgdir, 'dist', 'web'),
    publicPath: '/web/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new WebpackBar({
      name: 'client',
    }),
  ],
});

if (isProd) {
  configClient = merge(configClient, {
    entry: {
      bundle: join(pkgdir, 'src', 'app', 'app.client'),
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: join(pkgdir, 'dist_analyzer', 'index.client.html'),
      }),
    ],
  });
}

module.exports = configClient;
