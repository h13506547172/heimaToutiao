import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/localStorage'

Vue.use(Vuex)
const TOKENSTR = 'token'
export default new Vuex.Store({
  state: {
    userToken: getItem(TOKENSTR) || null
  },
  getters: {},
  mutations: {
    setUserToken(state, data) {
      state.userToken = data
      setItem(TOKENSTR, data)
    }
  },
  actions: {},
  modules: {}
})
