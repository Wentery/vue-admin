module.exports = {
   chainWebpack: config => {
      config.plugin('html').tap(args => {
         args[0].title = 'CRM'
         return args
      })
   },
   configureWebpack: { // webpack 配置
      // plugins: [
      //    new webpack.optimize.LimitChunkCountPlugin({
      //       maxChunks: 15,
      //       minChunkSize: 500
      //    })
      // ],
      // externals: {
      // 	'vue': 'Vue',
      // 	'element-ui': 'Element'
      // }
   },
   devServer: {
      port: 8888,
      open: true,
      // proxy: {},
      disableHostCheck: true,
   },
  productionSourceMap: true
}