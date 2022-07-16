import axios from 'axios'
import store from '@/store/index'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  // 如果5秒没有反应就返回错误
  timeout: 5000
})
// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前如果user.token存在就添加请求头
    const { userToken } = store.state
    if (userToken && userToken.token) {
      config.headers.Authorization = 'Bearer ' + store.state.userToken.token
    }
    // config是本次请求的请求配置对象,一定要返回
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
