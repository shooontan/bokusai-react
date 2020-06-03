import { Compiler, Configuration } from 'webpack';

export class ReactFreshPlugin {
  async apply(compiler: Compiler) {
    const injectedEntry = this.addEntry(compiler.options.entry);
    compiler.options.entry = injectedEntry;

    const isUserResource = (resource: string) =>
      !/node_modules/.test(resource) && /(js|ts)x?/;

    compiler.hooks.normalModuleFactory.tap(this.constructor.name, nmf => {
      nmf.hooks.afterResolve.tap(this.constructor.name, data => {
        if (isUserResource(data.resource)) {
          data.loaders.unshift({
            loader: require.resolve('./loader'),
          });
        }
        return data;
      });
    });
  }

  addEntry(entry: Configuration['entry']): Configuration['entry'] {
    if (!entry) {
      return require.resolve('./runtime');
    }

    if (typeof entry === 'string') {
      return [require.resolve('./runtime'), entry];
    }

    if (Array.isArray(entry)) {
      return [require.resolve('./runtime'), ...entry];
    }

    if (typeof entry === 'object') {
      return Object.entries(entry).reduce(
        (acc, [curKey, curEntry]) => ({
          ...acc,
          [curKey]: this.addEntry(curEntry),
        }),
        {}
      );
    }
    // TODO: function entry
    return [require.resolve('./runtime')];
  }
}
