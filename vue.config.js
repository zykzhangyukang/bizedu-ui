'use strict';
const EndWebpackPlugin = require('./plugins/webpack.end.js');
module.exports = {
  devServer: {
    port: 9991,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/api',
        ws: true,
        pathRewrite: {'^/api' : ''},
        changeOrigin: true
      },
    }
  },
  configureWebpack: config => {
    if (process.env.ENV === 'production') {
      config.plugins.push(new EndWebpackPlugin('dist','bizedu-ui'))
      config.externals = {
        vue: 'Vue',
        axios: 'axios',
        moment: 'moment',
        screenfull: 'screenfull',
        nprogress: 'NProgress',
        'vue-router': 'VueRouter',
        'ant-design-vue': 'antd',
      }
    }
  },
  chainWebpack: (config) => {
    // config.resolve.alias
    //   .set('@', resolve('src')) 
    //   .end();
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};