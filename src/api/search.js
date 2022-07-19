import request from '@/utils/request'
// 搜索建议
export const suggestionAPI = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
