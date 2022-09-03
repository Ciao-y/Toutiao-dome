import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载全局样式
import './styles/index.less'
// 动态设置rem加载
import 'amfe-flexible'
// 加载dayjs初始化配置
import './utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
