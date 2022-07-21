import request from '@/utils/request'

// 获取新闻内容
export const articleConAPI = (id) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles/' + id
  })
}
// 获取评论的信息
export const commentAPI = (type, source, offset) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params: {
      // a-对文章(article)的评论，c-对评论(comment)的回复
      type,
      // 源id，文章id或评论id
      source,
      offset,
      limit: 10
    }
  })
}
// 发布评论
export const releaseCommentAPI = (target, content, artId) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      // 评论的目标id
      target,
      // 评论内容
      content,
      // 文章id
      art_id: artId
    }
  })
}
