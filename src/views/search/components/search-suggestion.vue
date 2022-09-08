<template>
  <div class="search_suggestion">
  <van-cell
   icon="search"
   v-for="(text,index) in SuggestionsList"
   :key="index"
   @click="$emit('search',text)"
   ><span slot="title" v-html="highlight(text)"></span>
  </van-cell>
  </div>
</template>
<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
import { SuggestionsAPI } from '../../../api/search'
import { debounce } from 'lodash'
export default {
// import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    Search_text: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    // 这里存放数据
    return {
      SuggestionsList: [] // 建议列表的数据
    }
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {
    // 当Search_text 文本框值发生改变的时候就会触发这个函数
    Search_text: {
      // 优化前写法
      // handler (value) {
      //   // console.log(value)
      //   this.SearChSuggestions(value)
      // },
      // 防抖优化 debounce相当于是定时器 里面是函数 返回值是防抖后的函数
      handler: debounce(function (value) {
        this.SearChSuggestions(value)
        // console.log(value)
      }, 300),
      immediate: true // 开始就立即执行一次
    }
  },
  // 方法集合
  methods: {
    async SearChSuggestions (q) {
      try {
        const { data } = await SuggestionsAPI(q)
        if (data.data.options.length === 0 || data.data.options === null) {
          data.data.options[0] = this.SuggestionsList
        }
        // console.log(this.SuggestionsList)
        this.SuggestionsList = data.data.options
      } catch (err) {
        this.$toast('数据获取失败,请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.Search_text}</sapn>`
      // 方案一
      // const reg = new RegExp(this.Search_text, 'gi')
      // return text.replace(reg, highlightStr)
      return text && text.split(this.Search_text).join(highlightStr)
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {}
}
</script>
<style scoped lang="less">
  .search_suggestion{
    /deep/span.active{
      color: #3296fa;
    }
  }
</style>
