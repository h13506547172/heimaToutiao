import request from '@/utils/request'
// 存储到本地的方法
import storage from '@/utils/storage'
const heimaChannelMy = 'heima_channel_my'
export const getChannelByLocal = () => storage.get(heimaChannelMy)
export const setChannelByLocal = (myChannel) =>
  storage.set(heimaChannelMy, myChannel)

// 发送axios请求
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

export const AllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
export const delChannels = (id) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/channels/' + id
  })
}
// 添加
export const addChannel = (id, seq) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      // seq表示要添加到数组的索引号
      channels: [{ id: id, seq: seq }]
    }
  })
}
