<template>
  <div class="collect_article">
    <van-icon
      :color="value ? '#ffa500' : '#777'"
      :name="value ? 'star' : 'star-o'"
      @click="onCllect"
      :loading="loading"
    />
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { addCollect, deletCollect } from '@/api/article'
export default {
// import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    CollectId: {
      type: [Number, String, Object],
      required: true

    }
  },
  data () {
    // 这里存放数据
    return {
      loading: false

    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onCllect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏 点击取消收藏
          await deletCollect(this.CollectId)
        } else {
          // 没有收藏 点击收藏
          await addCollect(this.CollectId)
        }

        //   更新视图
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast.fail('请稍后再试')
      }
      this.loading = false
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {
    this.onCllect()
  },
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
<style scoped></style>
