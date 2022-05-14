const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  devServer: {
    port: 8080
  },
  transpileDependencies: true,
  publicPath: '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 哪些文件自动引入 ，使用绝对路径
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  }
  // 修改webpack 将10kb以内的图片打包成base64格式图片
  // chainWebpack: config => {
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => Object.assign(options, { limit: 10240 }))
  // }
})
