import path from 'path';
import Module from 'module';
import { MultiCompiler, Compiler, Stats, compilation } from 'webpack';

type CustomCompilation = compilation.Compilation & {
  name?: string;
};

type CunstomStats = Stats & {
  compilation: CustomCompilation;
};

export type MultiStats = {
  stats: CunstomStats[];
  hash: string;
};

export const isMultiCompiler = (
  compiler: Compiler | MultiCompiler
): compiler is MultiCompiler => {
  return compiler && Object.getOwnPropertyNames(compiler).includes('compilers');
};

export const getCompiler = (
  multiCompiler: MultiCompiler,
  name: 'server' | 'client'
) => {
  return multiCompiler.compilers.filter(compiler => compiler.name === name);
};

export const getStats = (multiStats: MultiStats, name: 'server' | 'client') => {
  return multiStats.stats.filter(stats => stats.compilation.name === name);
};

export const getFilename = (
  serverStats: Stats,
  outputPath: string,
  chunkName: string
) => {
  const { assetsByChunkName } = serverStats.toJson();
  const filename = (assetsByChunkName && assetsByChunkName[chunkName]) || '';
  return path.join(
    outputPath,
    Array.isArray(filename)
      ? filename.find(asset => /\.js$/.test(asset)) || ''
      : filename
  );
};

export const requireFromString = (code: string, filename: string) => {
  const parent = module.parent || undefined;
  const m = new Module(filename, parent);
  m.filename = filename;
  // @ts-ignore
  const paths: string[] = Module._nodeModulePaths(path.dirname(filename));
  m.paths = paths;
  // @ts-ignore
  m._compile(code, filename);
  return m.exports;
};
