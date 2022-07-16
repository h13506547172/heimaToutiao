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
    redirect: '/ ',
    component: () => {
      return import('@/views/layout')
    },
    children: [
      {
        path: '/ ',
        component: () => {
          return import('@/views/home')
        }
      },
      {
        path: '/video',
        component: () => {
          return import('@/views/Video')
        }
      },
      {
        path: '/qa',
        component: () => {
          return import('@/views/QA')
        }
      },
      {
        path: '/my',
        component: () => {
          return import('@/views/my')
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
