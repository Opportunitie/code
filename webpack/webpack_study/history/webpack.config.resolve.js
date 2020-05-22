// cleanWebpackPlugin  清除dist里面的文件
// copyWebpackPlugin  拷贝插件
// bannerPlugin 内置
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
// let CopyWebpackPlugin = require('copy-webpack-plugin')
// let webpack = require('webpack')
module.exports = {
  // 入口
  entry:{
    main: './src/index.js',
  },
 // 出口
  output:{
    // [名称].[哈希:显示hash位数].js
    filename:'[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  // 模式
  // mode:'development',
  // mode:'production',
  // 1) 源码映射 单独生成一个sourcemap文件 出错了会表示出错的列和行
  // devtool: 'source-map',  // 增加映射文件 可以帮助我们调试源码
  // 2) 不会产生单单独文件，但是可以显示行和列
  devtool: 'eval-source-map', 
  // 3)不会产生列，但是是一个单独的映射文件
  // devtool: 'cheap-module-source-map', //产生后可以保留起来
  // 4）不会产生文件 集成在打包后的文件中 不会产生列
  // devtool: 'cheap-module-eval-source-map',
  // watch: true,
  // watchOptions:{
  //   // 监控的选项
  //   poll: 1000, // 每秒访问我1000次
  //   aggregateTimeout: 500, // 防抖 我一直输入代码
  //   ignored: /node_modules/ // 不需要进行监控的文件
  // },
  resolve: { // 解析 第三方包
    modules:  [path.resolve('node_modules')],
    extensions: ['.js','.css','.json','.vue'],
    // mainFields: ['style', 'main'],
    // mainFiles: [] // 入口文件的名字 index.js
    // alias: {    //别名 vue vue.runtime
    //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // },
  },

  module:{
    rules:[
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
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
    new webpack.DefinePlugin({

    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      // chunks: ['home'], //指定将home入口的js注入到index.html中
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: './doc',
    //       to: './'
    //     }
    //   ]
    // }),
    // new webpack.BannerPlugin('make 2020 ')
  ]
}