import { join } from 'path';
import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackBar from 'webpackbar';
import { webpackBaseConfig } from './webpack.config.common';
import { isDev, pkgdir, getTarget } from './utils';
import { ReactFreshPlugin } from './react-refresh-plugin';

let webpackClientConfig = merge(
  webpackBaseConfig({ target: getTarget('web') }),
  {
    name: 'client',
    entry: {
      bundle: [
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
  }
);

if (isDev) {
  webpackClientConfig = merge(webpackClientConfig, {
    plugins: [new ReactFreshPlugin()],
  });
}

if (!isDev) {
  webpackClientConfig = merge(webpackClientConfig, {
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

export { webpackClientConfig };
