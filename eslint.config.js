import config from 'eslint-config-standard';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...[].concat(config),

  {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:security/recommended',
      'plugin:prettier/recommended',
      'prettier',
      'prettier/@typescript-eslint',
      'prettier/standard',
    ],
    plugins: ['@typescript-eslint', 'prettier', 'security'],
    rules: {
      'prettier/prettier': ['error'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
