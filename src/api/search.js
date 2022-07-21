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
// 搜索结果
export const resultAPI = (q, page) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params: {
      q,
      page: page || 1,
      per_page: 10
    }
  })
}
