/*
 * @Author: your name
 * @Date: 2021-04-13 23:13:16
 * @LastEditTime: 2021-04-17 19:34:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gshop-server_finale:\有关JS、vue的练习\vue\11-element\frame\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Login',
    name: 'Login',

  component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
  },
  {
    path: '/Home',
    name: 'Home',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
    children:[
      {
        path: 'users',
        name: 'users',
    
      component: () => import(/* webpackChunkName: "about" */ '../components/用户管理/userlist.vue'),
      },
      {
        path: 'roles',
        name: 'roles',
    
      component: () => import(/* webpackChunkName: "about" */ '../components/权限管理/jiao.vue'),
      },
      {
        path: 'rights',
        name: 'rights',
    
      component: () => import(/* webpackChunkName: "about" */ '../components/权限管理/quan.vue'),
      },
      {
        path: 'goods',
        name: 'goods',
    
      component: () => import(/* webpackChunkName: "about" */ '../components/商品管理/goods.vue'),
      },
      {
        path: 'params',
        name: 'params',
    
      component: () => import(/* webpackChunkName: "about" */ '../components/商品管理/params.vue'),
      },
      {
        path: 'categories',
        name: 'categories',
    
      component: () => import(/* webpackChunkName: "about" */ '../components/商品管理/categories.vue'),
      },
      {
        path: 'reports',
        name: 'reports',
    
      component: () => import(/* webpackChunkName: "about" */ '../components/数据统计/reports.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
    
      component: () => import(/* webpackChunkName: "about" */ '../components/订单管理/orders.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})


// 为路由对象添加导航守卫
router.beforeEach((to,from,next)=>{
  // 如果是登录页面  就放行
  if(to.path==='/Login') return next()
  // 在sessionStorage 中获取保存的token值
  const token =window.sessionStorage.getItem('token')
  // 如果页面中没有token值存在  就返回登录页
  if(!token) return next('/Login')
  next()
})
export default router
