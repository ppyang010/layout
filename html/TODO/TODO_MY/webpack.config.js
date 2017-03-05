const path = require('path');

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path:path.join(__dirname, './dist/js'),
    filename: "build.js"
  },
  module: {
    loaders: [
      //.js 文件使用 babel-loader 来编译处理
      { test: /\.js$/,    loader: "babel!jsx" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: []
};
