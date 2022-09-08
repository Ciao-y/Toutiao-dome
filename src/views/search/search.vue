<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="search_container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="Searchvalue"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isShow=false"
      />
    </form>
    <!-- 搜索栏 -->

    <!-- 搜索结果 -->
    <Result v-if="isShow"
    :Search_text="Searchvalue"
    />

    <!-- 联想建议 -->
    <!-- 判断搜索框是否有内容 -->
    <Suggestion v-else-if="Searchvalue"
    :Search_text="Searchvalue"
    @search="onSearch"
    />

    <!-- 搜索历史记录 -->
    <History v-else
    :HistoryList="HistoryList"
    @AllHistoryList="HistoryList=[]"
    @Search="onSearch"
    />

  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import Result from './components/search-result.vue'
import History from './components/search-history.vue'
import Suggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {
    Result,
    History,
    Suggestion
  },
  props: {},
  data () {
    return {
      Searchvalue: '', // 搜索文本
      isShow: false, // 控制搜索结果的显示
      HistoryList: getItem('TOUTIOA_SEARCH_HISTORIES') || [] // 搜索的历史记录
    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {
    HistoryList (value) {
      // console.log(111)
      setItem('TOUTIOA_SEARCH_HISTORIES', value)
    }
  },
  // 方法集合
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.Searchvalue = val
      // 存儲搜索歷史記錄
      // 要求：不要有歷史記錄 ，最新的排在最前面
      // 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
      const index = this.HistoryList.indexOf(val)
      if (index !== -1) {
        this.HistoryList.splice(index, 1)
      }
      this.HistoryList.unshift(val)
      // 显示搜索结果
      this.isShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted () {},
  // 生命周期 - 创建之前
  beforeCreate () {},
  // 生命周期 - 挂载之前
  beforeMount () {},
  // 生命周期 - 更新之前
  beforeUpdate () {},
  // 生命周期 - 更新之后
  updated () {},
  // 生命周期 - 销毁之前
  beforeDestroy () {},
  // 生命周期 - 销毁完成
  destroyed () {},
  // 如果页面有 keep-alive 缓存功能，这个函数会触发
  activated () {}
}
</script>
<style scoped lang="less">
.search_container {
  .van-search__action {
    color: #fff;
  }
}
</style>
