import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => {
      return import('@/views/login')
    }
  },
  {
    path: '/',
    component: () => {
      return import('@/views/layout')
    },
    children: [
      {
        path: '/',
        component: () => {
          return import('@/views/layout')
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
