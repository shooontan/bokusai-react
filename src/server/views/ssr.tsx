import path from 'path';
import express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import pkgDir from 'pkg-dir';
import { configStore } from '~/client/store/configStore';
import { AppContext } from '~/types/app.type';

const pkgdir = pkgDir.sync(__dirname) || '';
const nodeStatsFile = path.join(
  pkgdir,
  'dist',
  'server',
  'loadable-stats.json'
);
const webstatsFile = path.join(pkgdir, 'dist', 'web', 'loadable-stats.json');

export default function ssr() {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const context: AppContext = {};
    const helmetContext: Partial<FilledContext> = {};
    const sheet = new ServerStyleSheet();

    try {
      const store = configStore({
        initialState: {
          counter: {
            count: 55,
          },
        },
      });

      const nodeExtractor = new ChunkExtractor({
        statsFile: nodeStatsFile,
        entrypoints: ['app.server'],
      });
      const App = nodeExtractor.requireEntrypoint().default;

      const webExtractor = new ChunkExtractor({
        statsFile: webstatsFile,
        entrypoints: ['bundle'],
      });

      const jsx = webExtractor.collectChunks(
        sheet.collectStyles(
          <HelmetProvider context={helmetContext}>
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <App />
              </StaticRouter>
            </Provider>
          </HelmetProvider>
        )
      );

      const html = renderToString(jsx);
      const preloadedState = store.getState();
      const { helmet } = helmetContext as Required<FilledContext>;

      if (context.status === 404) {
        res.status(404);
      } else if (context.url) {
        return res.redirect(301, context.url);
      } else {
        res.status(200);
      }

      return res.send(
        '<!doctype html>' +
          `<html ${helmet.htmlAttributes.toString()}>` +
          '<head>' +
          helmet.meta.toString() +
          helmet.title.toString() +
          helmet.link.toString() +
          helmet.script.toString() +
          webExtractor.getLinkTags() +
          webExtractor.getStyleTags() +
          sheet.getStyleTags() +
          '</head>' +
          '<body>' +
          `<div id="app">${html}</div>` +
          webExtractor.getScriptTags() +
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
            preloadedState
          ).replace(/</g, '\\u003c')}</script>` +
          '</body>' +
          '</html>'
      );
    } catch (error) {
      next(error);
    }
  };
}
