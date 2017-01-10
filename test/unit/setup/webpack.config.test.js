const path = require('path');

const projectRoot = path.resolve(__dirname, '../../../');

module.exports = {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
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
    ],
  },
  devtool: '#inline-source-map',
};
