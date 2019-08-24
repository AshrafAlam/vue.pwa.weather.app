module.exports = {
  devServer: {
    disableHostCheck: true,
    "proxy": {
      "/api": {
      "target": 'https://samples.openweathermap.org',
      "pathRewrite": { '^/api': '' },
      "changeOrigin": true,
      "secure": false
      }
    }
  }
}
