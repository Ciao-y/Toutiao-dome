
import request from '../utils/request.js'
// 请求获取展示数据
export const SuggestionsAPI = query => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q: query
    }
  })
}
// 獲取搜索結果
export const ResultAPI = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
