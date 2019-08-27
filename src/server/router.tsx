import path from 'path';
import * as express from 'express';
import pkgDir from 'pkg-dir';
import ssr from '~/server/views/ssr';

const router = express.Router();
const pkgdir = pkgDir.sync(__dirname) || '';

router.use(express.static(path.join(pkgdir, 'public')));
router.use('/web', express.static(path.join(pkgdir, 'dist', 'web')));

router.get('/api', (_, res) =>
  res.json({
    request: true,
    time: new Date(),
  })
);

// server side rendering
router.get('*', ssr());

// error handle
router.use(
  (
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.log(error);
    res.status(500);
    return res.send(error);
  }
);

export default router;
