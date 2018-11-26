module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/weather_mini": { // 天气接口的proxy
        target: "http://wthrcdn.etouch.cn",
        changeOrigin: true
      }
    }
  }
}