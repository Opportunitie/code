let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode:'development',
  // mode:'production',

  // 1) 源码映射 单独生成一个sourcemap文件 出错了会表示出错的列和行
  // devtool: 'source-map',  // 增加映射文件 可以帮助我们调试源码
  // 2) 不会产生单单独文件，但是可以显示行和列
  // devtool: 'eval-source-map', 
  // 3)不会产生列，但是是一个单独的映射文件
  // devtool: 'cheap-module-source-map', //产生后可以保留起来
  // 4）不会产生文件 集成在打包后的文件中 不会产生列
  devtool: 'cheap-module-eval-source-map',
  entry:{
    home: './src/index.js',
  },

  output:{
    // [name] home或者other
    filename:'[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home'], //指定将home入口的js注入到index.html中
    }),
    new CleanWebpackPlugin(),

  ]
}