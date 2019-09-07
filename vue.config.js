module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    host: '127.0.0.1',
    disableHostCheck: true,
    port: 9998
  }
  // devServer: { 
  //   // host: '0.0.0.0',
  //   // hot: true,
  //   public: '192.168.5.7:8080',
  //   disableHostCheck: true,
  //   proxy: {
  //     '/api': {     
  //       target: 'https://www.easy-mock.com/mock/5d03045ae490c733afb1fa64/example',   
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     },
  //   },
  // }
};