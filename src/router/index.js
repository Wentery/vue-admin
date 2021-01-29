import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('@/views/login/LoginView.vue')
    }, {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = store.getters.getToken
  const path = to.path
  if (!token && path !== '/login' && path !== '/') {
    router.replace('/')
  } else {
    next()
  }
})
export default router
