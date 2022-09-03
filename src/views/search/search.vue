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
    <History v-else/>

  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import Result from './components/search-result.vue'
import History from './components/search-history.vue'
import Suggestion from './components/search-suggestion.vue'
export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {
    Result,
    History,
    Suggestion
  },
  props: {},
  data () {
    // 这里存放数据
    return {
      Searchvalue: '', // 搜索文本
      isShow: false // 控制搜索结果的显示
    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onSearch (val) {
      // console.log(val)
      this.Searchvalue = val
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
