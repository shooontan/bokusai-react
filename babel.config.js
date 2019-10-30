module.exports = api => {
  api.cache(true);

  const presetEnvTargets =
    process.env.BUILD_TARGET === 'client'
      ? { browsers: 'last 2 versions' } // for production client build
      : { node: 'current' }; // for development build

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: presetEnvTargets,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      'react-hot-loader/babel',
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
    ],
  };
};
