import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/page/login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/page/index')
    },
    {
      path: '/music',
      component: () => import('@/page/music')
    },
    {
      path: '/animation',
      component: () => import('@/page/animation')
    },
    {
      path: '/fx',
      name: 'login',
      component: () => import('@/page/fx')
    },
    {
      path: '*',
      // redirect: '/'
      component: () => import('@/components/404')
    }
  ]
})
