module.exports = {
  parser: 'babel-eslint',
  env: {
    mocha: true
  },
  globals: {
    'expect': true,
    'sinon': true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb',
  "plugins": [
    "mocha",
    "vue"
  ],
  rules: {
    "import/no-extraneous-dependencies": 0,
    "no-unused-expressions": 0,
    "mocha/no-exclusive-tests": "error"
  },
};
