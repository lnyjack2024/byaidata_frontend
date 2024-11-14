/*
 * @Description: 配置代理
 * @Author: wangyonghong
 * @Date: 2024-11-13 13:58:29
 * @LastEditTime: 2024-11-14 11:00:53
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
      '/api', // 匹配请求前缀为 /api 的请求
      createProxyMiddleware({
        target: 'http://47.116.221.126:3003', // 目标服务器地址
        changeOrigin: true, // 将请求头中的 Origin 设置为目标 URL
        pathRewrite: {
          '^/api': '', // 去除路径中的 /api 前缀
        },
      })
    );
  };