import http from 'http';
import path from 'path';
import express from 'express';
import pkgDir from 'pkg-dir';
import { Compiler } from 'webpack';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const hotServerMiddleware = require('./middlewares/hot-server-middleware');
  const webpackConfig = require('../../webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig[0].output.publicPath,
      writeToDisk: true,
      serverSideRender: true,
      logLevel: 'silent',
    })
  );
  app.use(
    webpackHotMiddleware(
      compiler.compilers.find(
        (compiler: Compiler) => compiler.name === 'client'
      ),
      { log: false }
    )
  );
  app.use(hotServerMiddleware(compiler));
} else {
  const pkgdir = pkgDir.sync(__dirname) || '';
  const statsPath = path.resolve(
    pkgdir,
    'dist',
    'server',
    'loadable-stats.json'
  );
  const { outputPath } = require(statsPath);
  const routerPath = path.resolve(outputPath, 'router.js');
  const router = require(routerPath).default;
  app.use(router);
}

const server = http.createServer(app);

server.listen(3000);
server.on('error', console.log);
server.on('listening', () => {
  console.log('Server is listening...');
});
