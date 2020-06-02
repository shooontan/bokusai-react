import { join } from 'path';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackBar from 'webpackbar';
import { webpackBaseConfig } from './webpack.config.common';
import { isDev, pkgdir, getTarget } from './utils';

let webpackServerConfig = merge(
  webpackBaseConfig({ target: getTarget('node') }),
  {
    name: 'server',
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
  }
);

if (isDev) {
  webpackServerConfig = merge(webpackServerConfig, {
    entry: {
      'entry.server': join(pkgdir, 'src', 'server', 'router'),
    },
  });
} else {
  webpackServerConfig = merge(webpackServerConfig, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: join(pkgdir, 'dist_analyzer', 'index.server.html'),
      }),
    ],
  });
}

export { webpackServerConfig };
