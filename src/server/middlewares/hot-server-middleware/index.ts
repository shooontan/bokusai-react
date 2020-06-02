import * as express from 'express';
import { MultiCompiler, Compiler } from 'webpack';
import {
  isMultiCompiler,
  getCompiler,
  getStats,
  getFilename,
  requireFromString,
} from './utils';

const MIDDLEWARE_NAME = 'hot-server-middleware';

export interface Options {
  chunkName: string;
}

const options: Options = {
  chunkName: 'entry.server',
};

export const hotServerMiddleware = (
  multiCompiler: MultiCompiler | Compiler
) => {
  if (!isMultiCompiler(multiCompiler)) {
    throw new Error('compiler is not multiCompiler');
  }

  const serverCompiler = getCompiler(multiCompiler, 'server')[0];

  if (!serverCompiler) {
    throw new Error('Cannot find server compiler.');
  }

  let renderer: Function | undefined;
  let error: any = false;

  multiCompiler.hooks.done.tap(MIDDLEWARE_NAME, multiStats => {
    error = false;

    const serverStats = getStats(multiStats, 'server')[0];
    if (serverStats.compilation.errors.length) {
      error = serverStats.compilation.errors;
      renderer = undefined;
      return;
    }

    const filename = getFilename(
      serverStats,
      serverCompiler.outputPath,
      options.chunkName
    );

    const buffer = serverCompiler.inputFileSystem.readFileSync(filename);
    try {
      renderer = requireFromString(buffer.toString(), filename).default;
    } catch (requireerror) {
      error = requireerror;
      return;
    }

    if (typeof renderer !== 'function') {
      throw new Error('server renderer must export a function');
    }
  });

  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error) {
      return next(error);
    } else if (typeof renderer !== 'function') {
      return next(new Error('renderer is undefined.'));
    }
    return renderer(req, res, next);
  };
};
