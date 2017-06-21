module.exports = {
  root: true,
  env: {
    'browser': true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb',
  plugins: [
    'vue'
  ],
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-underscore-dangle': 0
  }
};
