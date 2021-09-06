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
    'airbnb/base',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'arrow-parens': 0,
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
