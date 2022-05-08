module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb/base',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'arrow-parens': 0,
    'max-len': 0,
    '@typescript-eslint/no-explicit-any': 0
  },
  overrides: [
    {
      files: ['test/*.spec.js'],
      rules: {
        'import/extensions': 0,
        'no-undef': 0,
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js'],
    },
    'import/resolver': {
      node: {
        paths: ['lib'],
        extensions: ['.js', '.ts'],
      },
    },
  },
};
