/*
 * @Author: your name
 * @Date: 2021-04-13 23:13:16
 * @LastEditTime: 2021-04-14 18:17:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gshop-server_finale:\有关JS、vue的练习\vue\11-element\frame\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Login',
        name: 'Login',

        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/login.vue'),
    },
    {
        path: '/Home',
        name: 'Home',

        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue'),
        children: [{
                path: 'userList',
                name: 'userList',

                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/用户管理/userlist.vue'),
            },
            {
                path: 'addUser',
                name: 'addUser',

                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/用户管理/addUser.vue'),
            },
            {
                path: 'removeUser',
                name: 'removeUser',

                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/用户管理/removeUser.vue'),
            },
        ]
    }
]

const router = new VueRouter({
    routes
})


// 为路由对象添加导航守卫
router.beforeEach((to, from, next) => {
    // 如果是登录页面  就放行
    if (to.path === '/Login') return next()
        // 在sessionStorage 中获取保存的token值
    const token = window.sessionStorage.getItem('token')
        // 如果页面中没有token值存在  就返回登录页
    if (!token) return next('/Login')
    next()
})
export default router