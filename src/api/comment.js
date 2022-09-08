
import request from '@/utils/request'
// 獲取文章評論列表
export const CommentAPI = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
// 评论点赞
export const addCommentAPI = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论点赞
export const deleteCommentAPI = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
// 发布留言
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
