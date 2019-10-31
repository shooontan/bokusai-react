import path from 'path';
import * as express from 'express';
import pkgDir from 'pkg-dir';
import ssr from '~/server/views/ssr';
import { sleep } from '~/utils/timeUtil';

const router = express.Router();
const pkgdir = pkgDir.sync(__dirname) || '';

router.use(express.static(path.join(pkgdir, 'public')));
router.use('/web', express.static(path.join(pkgdir, 'dist', 'web')));

router.get('/api', async (_, res) => {
  await sleep(3000); // slow response
  return res.json({
    request: true,
    time: new Date(),
  });
});

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
