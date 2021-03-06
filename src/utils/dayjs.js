// 引入dayjs
import dayjs from 'dayjs'
// 配置中文包
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文
// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default dayjs
