<template>
  <div class="search_history">
    <van-cell title="搜索历史">
     <div v-if="isShow" >
      <span @click="$emit('AllHistoryList')">全部删除</span>
      &nbsp;
      <span @click="isShow=false">完成</span>
     </div>
      <van-icon name="delete" v-else @click="isShow=true"/>
    </van-cell>
    <van-cell :title="item"
    v-for="(item,index) in HistoryList"
    :key="index"
    @click="onhistoryclick(item,index)">
    <van-icon name="close" v-if="isShow"/>
    </van-cell>

  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
export default {
// import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    HistoryList: {
      type: Array,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      isShow: false // 控制删除显示状态

    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onhistoryclick (item, index) {
      if (this.isShow) {
        //  删除状态,删除历史记录
        // eslint-disable-next-line vue/no-mutating-props
        this.HistoryList.splice(index, 1)
      } else {
        // 非删除状态 直接进去搜索
        this.$emit('Search', item)
      }
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
<style scoped>

</style>
