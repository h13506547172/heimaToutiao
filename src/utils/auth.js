// 获取用户的token
import storage from './storage'
const tokenKey = 'HMtoutiaoToken'
export const getToken = () => storage.get(tokenKey)
export const setToken = (token) => storage.set(tokenKey, token)
export const removeToken = () => storage.remove(tokenKey)
