module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['node', '@typescript-eslint'],
  settings: {
    node: {
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
    },
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'off', // Turn off base rule
    '@typescript-eslint/no-unused-vars': 'error',
    'no-undef': 'off', // TS handles this
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unsupported-features/node-builtins': 'off',
    'node/no-missing-import': 'off', // TS handles imports checking
    'node/no-unpublished-import': 'off', // We can use devDeps in tsconfig and scripts
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.min.js', '.husky/'],
};
