const configClient = require('./webpack/webpack.config.client');
const configServer = require('./webpack/webpack.config.server');

// TODO: fix product build process
module.exports = [configClient, configServer];
