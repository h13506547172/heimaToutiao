class Storage {
  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get(key) {
    // 能转成JSON字符串就转，报错就返回原值
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (err) {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage
