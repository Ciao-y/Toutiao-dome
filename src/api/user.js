/**
 * 用户相关的请求模块
 */
import request from '../utils/request.js'
// import store from '@/store/index.js'
/**
* 用户登录
*/
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 获取验证码
export const sendSms = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`

  })
}
// 获取用户自己的信息

export const getUserinfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}
// 获取用户频道列表
export const channel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
