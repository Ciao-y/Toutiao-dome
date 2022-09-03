import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  // 重定向
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  }, {
    path: '/',
    // name: 'layout',  如果父路由有默认子路由 那么这个那么没有任何意义
    component: () => import('../views/layout/index.vue'),
    redirect: '/home',
    children: [{
      path: 'home', // 为空的话 默认子路由 只能有一个
      name: 'home',
      component: () => import('../views/home/index.vue') // 首页
    }, {
      path: 'faqs',
      name: 'faqs',
      component: () => import('../views/Fsqs/index.vue')// 问答
    }, {
      path: 'flv',
      name: 'flv',
      component: () => import('../views/Flv/index.vue')// 视频
    }, {
      path: 'my',
      name: 'my',
      component: () => import('../views/my/index.vue')// 我的
    }
    ]
  }, {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
