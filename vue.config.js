/*
 * @Author: your name
 * @Date: 2021-04-11 17:09:38
 * @LastEditTime: 2021-04-22 19:18:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gshop-server_finale:\有关JS、vue的练习\vue\10-豆瓣\halves\vue.config.js
 */
module.exports = {
    //...
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000/api/private/v1',
          pathRewrite: { '^/api': '' },
          // changeOrigin: true,
        },
      },
    },
  };