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
// 关注用户
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}// 取消关注用户
export const deleFollow = target => {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/followings/$target'

  })
}
// 获取当前用户资料
export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 更新用戶資料
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
// 头像裁剪
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
