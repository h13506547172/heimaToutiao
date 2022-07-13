import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => {
      return import('@/views/login')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
