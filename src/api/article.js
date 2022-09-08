// 文章请求模块
import request from '@/utils/request'
// 请求获取文章数据
export const Aeticle = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
// 获取文章
export const AeticleByIdAPI = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }

  })
}// 取消收藏
export const deletCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`

  })
}
// 文章点赞

export const addLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞
export const deletLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
