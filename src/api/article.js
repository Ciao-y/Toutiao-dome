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
