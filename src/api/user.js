import request from '@/utils/request'
// 用户信息
export const userInfoAPI = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 上传图片
export const upImgAPI = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
// 更新个人信息
export const upUserInfoAPI = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
