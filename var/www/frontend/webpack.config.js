const path = require('path');

//webpackでHTMLを扱うためのプラグイン
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //bundleの開始位置
  entry: './src/App.js',
  //bundleされたファイルの場所
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  module: {
    //babelで[js, jsx]をコンパイル
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  // /src/index.htmlをdist/index.htmlに生成
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
		contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '*': 'http://web'
    },
    open: true,
    watchContentBase: true,
	},
};