import request from '@/utils/request'

export const newsListAPI = (id, timestamp) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp: timestamp
    }
  })
}
