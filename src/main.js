import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入rem适配
import 'amfe-flexible'
// 引入图标
import '@/assets/font/iconfont.css'
// 引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 图片裁剪工具
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
