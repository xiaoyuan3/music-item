module.exports = {
  // 配置configureWebpack
  configureWebpack: {
      resolve: {
          // 别名  为了以后路径方便引用
          alias: {
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views',
          }
      }
  }
}