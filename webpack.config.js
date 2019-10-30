const configClient = require('./webpack/webpack.config.client');
const configServer = require('./webpack/webpack.config.server');

if (process.env.NODE_ENV === 'production') {
  // use BUILD_TARGET in babel.config.js
  process.env.BUILD_TARGET = 'client';
  module.exports = configClient;
} else {
  module.exports = [configClient, configServer];
}
