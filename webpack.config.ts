import { webpackClientConfig } from './src/webpack/webpack.config.client';
import { webpackServerConfig } from './src/webpack/webpack.config.server';

// TODO: fix product build process
export default [webpackClientConfig, webpackServerConfig];
