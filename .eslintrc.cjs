module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['node'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.min.js', '.husky/'],
};
