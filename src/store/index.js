import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // {}是为了防止报错，userToken.token userToken为null时会报错
    userToken: getToken() || {}
  },
  getters: {},
  mutations: {
    setUserToken(state, data) {
      state.userToken = data
      setToken(data)
    }
  },
  actions: {},
  modules: {}
})
