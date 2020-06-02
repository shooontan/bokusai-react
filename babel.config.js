const isTargetWeb = caller => caller && caller.target === 'web';
// const isBabelLoader = caller => caller && caller.name === 'babel-loader';

module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  const isWeb = api.caller(isTargetWeb);
  // const isWebpack = api.caller(isBabelLoader);

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: isWeb ? 'usage' : undefined,
          corejs: isWeb ? 3 : false,
          targets: isWeb
            ? { browsers: 'last 2 versions' }
            : { node: 'current' },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      isWeb && !api.env('production') && 'react-refresh/babel',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '~': './src',
            '@': './src',
          },
        },
      ],
      '@loadable/babel-plugin',
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
          displayName: true,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
    ].filter(Boolean),
  };
};
