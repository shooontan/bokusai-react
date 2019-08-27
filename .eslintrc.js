module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  env: {
    jest: true,
    node: true,
    browser: true,
  },
  rules: {
    'react/prop-types': 0,
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_|^next$',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_|^next$',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../'],
      },
    ],
  },
};
