module.exports = {
  parser: 'babel-eslint',
  env: {
    mocha: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb',
  rules: {
    "import/no-extraneous-dependencies": 0
  }
};
