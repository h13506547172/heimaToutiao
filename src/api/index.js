import { login, sendSms } from './login'
import { myInfo } from './my'
import { getChannels, AllChannels, delChannels, addChannel } from './channels'
export * from './search'
// 全部引入news并暴露
export * from './news'
export const loginAPI = login
export const sendSmsAPI = sendSms
export const myInfoAPI = myInfo
export const getChannelsAPI = getChannels
export const AllChannelsAPI = AllChannels
export const delChannelsAPI = delChannels
export const addChannelAPI = addChannel
