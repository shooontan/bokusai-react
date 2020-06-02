import { resolve } from 'path';

export const isDev = process.env.NODE_ENV !== 'production';

export const pkgdir = resolve(__dirname, '..', '..');

export const getTarget = (target: 'web' | 'node') => target;
