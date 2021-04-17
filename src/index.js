/*
 * @Author: your name
 * @Date: 2021-04-11 17:10:11
 * @LastEditTime: 2021-04-14 18:38:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gshop-server_finale:\有关JS、vue的练习\vue\10-豆瓣\halves\src\assets\js\index.js
 */
import axios from 'axios'
// 添加请求拦截器

export default function(config){

    const instance = axios.create({
        baseURL: '/api',
        // timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}
      });


      instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        console.log(config)
       config.headers.Authorization=sessionStorage.getItem('token')
        // if(config.url!='/'){
        //   let token=sessionStorage.getItem('token')
        //   config.headers['token']=token
        // }
     
     
     
        //  if(config.url!='/login'||config.url!='/register'){
      //    let token=localStorage.getItem('token')
      //    config.headers['token']=token
      //  }
       
      return config;

       //第二种方法
      //  let token=localStorage.getItem('token')
      //  if(token){
      //   config.headers['token']=token
      //  }
        // return config;


  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
return instance(config)
}