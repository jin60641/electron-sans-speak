const path = require('path');

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb-typescript/base'
  ],
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
};
