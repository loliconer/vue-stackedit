const path = require('path')

module.exports = {
  lintOnSave: false,
  css: {
    extract: false,
    loaderOptions: {
      less: {
        strictMath: 'on'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      patterns: [
        path.resolve(__dirname, 'src/less/Variables.less'),
        path.resolve(__dirname, 'src/less/Mixins.less')
      ],
      preProcessor: 'less'
    }
  },
  chainWebpack: config => {
    config.performance.hints(false)
    config.module
      .rule('yml')
      .test(/\.yml$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
    config.externals({
      vue: 'Vue'
    })
  }
}
