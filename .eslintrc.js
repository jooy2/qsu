module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  rules: {
    'arrow-parens': 0,
    'import/extensions': 0,
    'no-throw-literal': 0,
  },
  overrides: [
    {
      files: ['test/*.spec.js'],
      rules: {
        'no-undef': 0,
      },
    },
  ],
};
