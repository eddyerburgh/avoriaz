const path = require('path');

const projectRoot = path.resolve(__dirname, '../../../');

module.exports = {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    resolve: {
      extensions: ['.js', '.vue'],
    },
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          projectRoot,
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  vue: {
    loaders: {
      js: 'babel',
    },
  },
  devtool: '#inline-source-map',
};
