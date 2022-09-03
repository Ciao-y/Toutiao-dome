import Vue from 'vue'
import dayjs from 'dayjs'
// // 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用 相对时间插件
dayjs.extend(relativeTime)
// // 全局使用
dayjs.locale('zh-cn')
// console.log(dayjs().format('YYYY-MM-DD'))
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
