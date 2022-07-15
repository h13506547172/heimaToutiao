// 封装本地存储模块

// 存值
export const setItem = (key, value) => {
  // typeof null == object
  if (typeof value === 'object' && value !== null) {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 取值
export const getItem = (key) => {
  // 能转成JSON字符串就转，报错就返回原值
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

// 删除值
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
