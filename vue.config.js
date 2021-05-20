const webpack = require('webpack')
const path = require('path')
const os = require('os')
const CompressionPlugin = require('compression-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const TITLE = 'CRM'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devServer: {
    port: 8888,
    open: true,
    // proxy: {},
    disableHostCheck: true
  },
  // 关闭sourceMap
  productionSourceMap: false,
  configureWebpack: config => { // webpack 配置
    console.log('\n=======================\n')
    console.log('当前NODE_ENV：', process.env.NODE_ENV)
    console.log('\n=======================\n')
    console.log('当前CPU数：', os.cpus().length)
    console.log('\n=======================\n')
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        TITLE: JSON.stringify(TITLE)
      }),
      // gzip
      new CompressionPlugin({
        test: /\.js$|\.html$|.\css/,
        threshold: 10240,
        deleteOriginalAssets: false
      }),
      // 使用HappyPack加快打包速度
      new HappyPack({
        id: 'happybabel',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool
      })
    ]
    config.module.rules.push({
      test: /\.js$/,
      loader: 'happypack/loader?id=happybabel',
      include: [resolve('src')],
      exclude: /node_modules/
    })
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = TITLE
      return args
    })
    // config.externals = {
    //    'element-ui': 'ElementUI'
    // }
    // 移除 prefetch 插件,不使用预加载机制加载路由懒加载的组件js
    config.plugins.delete('prefetch')
  }
}
