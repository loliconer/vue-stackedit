module.exports = {
  css: {
    extract: false,
    loaderOptions: {
      less: {
        strictMath: 'on'
      }
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
