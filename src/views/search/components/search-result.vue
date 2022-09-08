<template>
  <div class="search_result">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
</van-list>
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
// Result
// History
// Suggestion
import { ResultAPI } from '@/api/search'
export default {
// import 引入的组件需要注入到对象中才能使用
  components: {

  },
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
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pei_Page: 10
    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await ResultAPI({
          page: this.page, // 页码
          pei_page: this.pei_Page, // 每页大小
          q: this.Search_text // 查询关键字
        })
        // console.log(data)
        // 2.将数据添加到数据列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载中的loading关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
        //  如果有就更新获取下一个数据的页码
          this.page++
        } else {
          //  如果没有 则将加载状态 finisshed 设置为结束
          this.finished = true
        }
      } catch (err) {
        this.$toast('数据获取失败,请稍后再试')
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {}
  // 生命周期 - 挂载完成（可以访问 DOM 元素）

}
</script>
<style scoped>

</style>
