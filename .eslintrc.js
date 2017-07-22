module.exports = {
  root: true,
  env: {
    'browser': true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: [
      "plugin:flowtype/recommended",
      'airbnb'
  ],
  plugins: [
    'vue',
    'flowtype'
  ],
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-underscore-dangle': 0
  }
};
